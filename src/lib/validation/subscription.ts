import { z } from "zod";

/**
 * Subscription validation schemas
 */

export const createCheckoutSessionSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
});

export const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, "Subscription ID is required"),
});

export const updateSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, "Subscription ID is required"),
  newPriceId: z.string().min(1, "Price ID is required"),
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;

