import { stripe } from "./client";
import { prisma } from "@/lib/db";
import { env } from "@/env.mjs";
import type Stripe from "stripe";

/**
 * Verify and construct Stripe webhook event
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  // Log webhook event
  await prisma.webhookEvent.create({
    data: {
      type: event.type,
      data: event.data as any,
    },
  });

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark webhook as processed
    await prisma.webhookEvent.updateMany({
      where: { type: event.type, processed: false },
      data: { processed: true },
    });
  } catch (error) {
    console.error(`Error processing webhook ${event.type}:`, error);
    
    // Store error
    await prisma.webhookEvent.updateMany({
      where: { type: event.type, processed: false },
      data: {
        processed: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });

    throw error;
  }
}

/**
 * Handle subscription created or updated
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata.userId;
  if (!userId) {
    throw new Error("No userId in subscription metadata");
  }

  const status = mapStripeStatus(subscription.status);

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata.userId;
  if (!userId) {
    throw new Error("No userId in subscription metadata");
  }

  await prisma.subscription.update({
    where: { userId },
    data: {
      status: "CANCELED",
      stripeSubscriptionId: null,
    },
  });
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = invoice.subscription as string;
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await handleSubscriptionUpdate(subscription);
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = invoice.subscription as string;
  if (!subscriptionId) return;

  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "PAST_DUE" },
    });
  }
}

/**
 * Map Stripe subscription status to our database enum
 */
function mapStripeStatus(status: Stripe.Subscription.Status) {
  const statusMap: Record<Stripe.Subscription.Status, "ACTIVE" | "INACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING"> = {
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    incomplete: "INACTIVE",
    incomplete_expired: "INACTIVE",
    trialing: "TRIALING",
    unpaid: "PAST_DUE",
    paused: "INACTIVE",
  };

  return statusMap[status] || "INACTIVE";
}

