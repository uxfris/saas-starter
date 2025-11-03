import { stripe } from "./client";
import { env } from "@/env.mjs";
import type Stripe from "stripe";

export interface CreateCheckoutSessionParams {
  userId: string;
  userEmail: string;
  priceId: string;
  customerId?: string;
}

/**
 * Create a Stripe Checkout session for a subscription
 */
export async function createCheckoutSession({
  userId,
  userEmail,
  priceId,
  customerId,
}: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: customerId ? undefined : userEmail,
    client_reference_id: userId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  return session;
}

/**
 * Create a Stripe Billing Portal session
 */
export async function createBillingPortalSession(
  customerId: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  });

  return session;
}

