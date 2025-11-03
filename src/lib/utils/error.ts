/**
 * Custom error classes for better error handling
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "You don't have permission to perform this action") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = "Validation failed",
    public errors?: Record<string, string[]>
  ) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND_ERROR");
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, 429, "RATE_LIMIT_ERROR");
    this.name = "RateLimitError";
  }
}

/**
 * Format error for API responses
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(error instanceof ValidationError && error.errors ? { errors: error.errors } : {}),
      },
    };
  }

  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        statusCode: 500,
      },
    };
  }

  return {
    error: {
      message: "An unexpected error occurred",
      statusCode: 500,
    },
  };
}

/**
 * Handle async errors in server actions
 */
export async function handleServerAction<T>(
  action: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await action();
    return { data };
  } catch (error) {
    console.error("Server action error:", error);
    if (error instanceof AppError) {
      return { error: error.message };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
