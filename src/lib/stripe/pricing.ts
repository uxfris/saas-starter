/**
 * Stripe Pricing Configuration
 * Define your pricing plans here
 */

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  stripePriceId: string;
  features: string[];
  highlighted?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our platform",
    price: 0,
    interval: "month",
    stripePriceId: "", // No Stripe price for free tier
    features: [
      "10 AI generations per month",
      "Basic support",
      "Community access",
      "Limited features",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for professionals",
    price: 29,
    interval: "month",
    stripePriceId: process.env.STRIPE_PRICE_ID_PRO || "",
    features: [
      "Unlimited AI generations",
      "Priority support",
      "Advanced features",
      "API access",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large teams",
    price: 99,
    interval: "month",
    stripePriceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || "",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom deployment",
      "SLA guarantee",
      "Advanced security",
      "Team management",
    ],
  },
];

export function getPlanByPriceId(priceId: string): PricingPlan | undefined {
  return PRICING_PLANS.find((plan) => plan.stripePriceId === priceId);
}

export function getPlanById(planId: string): PricingPlan | undefined {
  return PRICING_PLANS.find((plan) => plan.id === planId);
}

