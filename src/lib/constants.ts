/**
 * Application constants
 */

export const APP_NAME = "SaaS Template";
export const APP_DESCRIPTION = "Production-ready SaaS template";

/**
 * Route paths
 */
export const ROUTES = {
  HOME: "/",
  PRICING: "/pricing",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_BILLING: "/dashboard/billing",
  DASHBOARD_AI: "/dashboard/ai",
} as const;

/**
 * API endpoints
 */
export const API_ROUTES = {
  WEBHOOK_STRIPE: "/api/webhooks/stripe",
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  THEME: "theme",
  SIDEBAR_OPEN: "sidebar-open",
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You must be logged in to access this resource",
  FORBIDDEN: "You don't have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  VALIDATION_ERROR: "Please check your input and try again",
  RATE_LIMIT: "Too many requests. Please try again later",
  SERVER_ERROR: "An unexpected error occurred. Please try again",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: "Profile updated successfully",
  PASSWORD_UPDATED: "Password updated successfully",
  SUBSCRIPTION_CREATED: "Subscription created successfully",
  SUBSCRIPTION_CANCELED: "Subscription canceled successfully",
} as const;

