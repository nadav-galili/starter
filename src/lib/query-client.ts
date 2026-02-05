import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "./api-client";
import { handleApiError } from "./error-handler";

/**
 * Default retry count for failed queries
 */
const DEFAULT_RETRY_COUNT = 3;

/**
 * Default retry count for failed mutations
 */
const MUTATION_RETRY_COUNT = 1;

/**
 * HTTP status codes that should be retried despite being 4xx errors
 * - 408: Request Timeout - server took too long, worth retrying
 * - 429: Too Many Requests - rate limited, retry after backoff
 */
const RETRYABLE_4XX_CODES = [408, 429];

/**
 * Determines if a failed request should be retried based on error type and attempt count.
 *
 * Retry behavior:
 * - Network errors (no response): Always retry up to max attempts
 * - 5xx server errors: Always retry up to max attempts
 * - 408 Request Timeout: Retry (server-side timeout, transient)
 * - 429 Too Many Requests: Retry (rate limiting, backoff helps)
 * - Other 4xx client errors: Never retry (client error, retrying won't help)
 *
 * @param failureCount - Number of times the request has already failed (0-indexed)
 * @param error - The error from the failed request
 * @param maxRetries - Maximum number of retry attempts
 * @returns true if the request should be retried, false otherwise
 */
function shouldRetry(
  failureCount: number,
  error: Error,
  maxRetries: number
): boolean {
  // Don't retry if we've exceeded max attempts
  if (failureCount >= maxRetries) {
    return false;
  }

  // If it's not an ApiError (e.g., network error), retry
  if (!(error instanceof ApiError)) {
    return true;
  }

  const status = error.status;

  // Retry 5xx server errors
  if (status >= 500) {
    return true;
  }

  // Retry specific 4xx errors (408 timeout, 429 rate limit)
  if (RETRYABLE_4XX_CODES.includes(status)) {
    return true;
  }

  // Don't retry other 4xx client errors (400, 401, 403, 404, etc.)
  if (status >= 400 && status < 500) {
    return false;
  }

  // Default: retry for any other cases
  return true;
}

/**
 * Calculates the delay before the next retry attempt using exponential backoff.
 *
 * Formula: min(1000 * 2^attempt, 30000)
 * - Attempt 1: 1000ms (1 second)
 * - Attempt 2: 2000ms (2 seconds)
 * - Attempt 3: 4000ms (4 seconds)
 * - Maximum delay capped at 30 seconds
 *
 * @param attemptIndex - The retry attempt number (0-indexed)
 * @returns Delay in milliseconds before the next retry
 */
function calculateRetryDelay(attemptIndex: number): number {
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds cap

  // Exponential backoff: 1s, 2s, 4s, 8s, ... capped at 30s
  return Math.min(baseDelay * Math.pow(2, attemptIndex), maxDelay);
}

/**
 * Default configuration for TanStack Query
 * These settings provide a good balance between freshness and performance
 */
const queryClientConfig = {
  defaultOptions: {
    queries: {
      /**
       * How long data is considered fresh (5 minutes)
       * During this time, cached data is used without refetching
       */
      staleTime: 5 * 60 * 1000,

      /**
       * How long inactive data stays in cache (30 minutes)
       * After this, cached data is garbage collected
       */
      gcTime: 30 * 60 * 1000,

      /**
       * Retry configuration for failed queries.
       *
       * Retries up to 3 times with intelligent error handling:
       * - Retries: Network errors, 5xx server errors, 408, 429
       * - Skips: 4xx client errors (except 408, 429) since they won't succeed on retry
       */
      retry: (failureCount: number, error: Error) =>
        shouldRetry(failureCount, error, DEFAULT_RETRY_COUNT),

      /**
       * Exponential backoff delay between retries.
       * Delays: 1s → 2s → 4s (capped at 30s for safety)
       */
      retryDelay: calculateRetryDelay,

      /**
       * Refetch on window focus (disabled for mobile as it's less relevant)
       */
      refetchOnWindowFocus: false,

      /**
       * Refetch on reconnect to ensure fresh data after network restoration
       */
      refetchOnReconnect: true,
    },
    mutations: {
      /**
       * Retry configuration for failed mutations.
       *
       * Retries once with the same intelligent error handling as queries:
       * - Retries: Network errors, 5xx server errors, 408, 429
       * - Skips: 4xx client errors (except 408, 429)
       *
       * Mutations use fewer retries than queries because they modify data
       * and excessive retries could cause unintended side effects.
       */
      retry: (failureCount: number, error: Error) =>
        shouldRetry(failureCount, error, MUTATION_RETRY_COUNT),

      /**
       * Exponential backoff delay between retries.
       * For mutations: 1s delay before single retry attempt
       */
      retryDelay: calculateRetryDelay,

      /**
       * Global error handler for mutations
       * Shows toast notification for API errors automatically
       * Can be overridden per-mutation with onError callback
       */
      onError: (error: Error) => {
        handleApiError(error);
      },
    },
  },
};

/**
 * Create and export a singleton QueryClient instance
 * This should be used with QueryClientProvider at the app root
 *
 * DevTools: The standard @tanstack/react-query-devtools are web-only.
 * For React Native debugging, use React Native Debugger or Reactotron
 * with their query inspection capabilities.
 */
export const queryClient = new QueryClient(queryClientConfig);
