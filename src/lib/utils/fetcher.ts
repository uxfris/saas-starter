/**
 * Type-safe fetcher for client-side API requests
 */

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public info?: unknown
  ) {
    super(message);
    this.name = "FetchError";
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch with error handling and timeout
 */
export async function fetcher<T = unknown>(url: string, options: FetchOptions = {}): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}) as Record<string, unknown>);
      throw new FetchError(
        (error as { message?: string }).message ||
          `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        error
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new FetchError("Request timeout", 408);
      }
      throw new FetchError(error.message, 500);
    }
    throw new FetchError("An unexpected error occurred", 500);
  }
}

/**
 * GET request
 */
export async function get<T = unknown>(
  url: string,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(url, { ...options, method: "GET" });
}

/**
 * POST request
 */
export async function post<T = unknown>(
  url: string,
  data?: unknown,
  options?: Omit<FetchOptions, "method">
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export async function put<T = unknown>(
  url: string,
  data?: unknown,
  options?: Omit<FetchOptions, "method">
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 */
export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  options?: Omit<FetchOptions, "method">
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export async function del<T = unknown>(
  url: string,
  options?: Omit<FetchOptions, "method" | "body">
): Promise<T> {
  return fetcher<T>(url, { ...options, method: "DELETE" });
}
