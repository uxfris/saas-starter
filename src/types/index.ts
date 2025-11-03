import type { User as PrismaUser, Subscription as PrismaSubscription } from "@prisma/client";

/**
 * Extended user type with relations
 */
export type UserWithSubscription = PrismaUser & {
  subscription: PrismaSubscription | null;
};

/**
 * Subscription status types
 */
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING";

/**
 * Usage types
 */
export type UsageType = "AI_GENERATION" | "API_CALL" | "STORAGE" | "CREDITS";

/**
 * API response types
 */
export type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
};

/**
 * Pagination types
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Stripe types
 */
export interface CheckoutSession {
  url: string | null;
}

/**
 * AI generation types
 */
export interface GenerationResult {
  content: string;
  tokens: number;
}

/**
 * Dashboard stats
 */
export interface DashboardStats {
  aiUsage: number;
  apiCalls: number;
  storageUsed: number;
  subscriptionStatus: SubscriptionStatus;
}
