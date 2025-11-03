import { env } from "@/env.mjs";

/**
 * Application configuration
 */

export const siteConfig = {
  name: "SaaS Template",
  description: "Production-ready SaaS template with Next.js, Supabase, Stripe, and OpenAI",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/template",
  },
};

export const dashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "AI Features",
      href: "/dashboard/ai",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
};

export const marketingConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
};

/**
 * Usage limits by plan
 */
export const usageLimits = {
  free: {
    aiTokens: 10000,
    apiCalls: 100,
    storage: 100 * 1024 * 1024, // 100MB
  },
  pro: {
    aiTokens: 100000,
    apiCalls: 10000,
    storage: 10 * 1024 * 1024 * 1024, // 10GB
  },
  enterprise: {
    aiTokens: -1, // unlimited
    apiCalls: -1, // unlimited
    storage: -1, // unlimited
  },
};

/**
 * Feature flags
 */
export const features = {
  aiGeneration: true,
  codeGeneration: true,
  summarization: true,
  translation: true,
  apiAccess: true,
};

