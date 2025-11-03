/**
 * API request and response types
 */

export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    errors?: Record<string, string[]>;
  };
}

export interface SuccessResponse<T = any> {
  data: T;
  message?: string;
}

/**
 * Auth API types
 */
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface ResetPasswordRequest {
  email: string;
}

/**
 * User API types
 */
export interface UpdateUserRequest {
  name?: string;
  avatarUrl?: string;
}

/**
 * Subscription API types
 */
export interface CreateCheckoutRequest {
  priceId: string;
}

export interface CreateCheckoutResponse {
  url: string;
}

/**
 * AI API types
 */
export interface GenerateContentRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateContentResponse {
  content: string;
  tokens: number;
}

