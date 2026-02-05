/**
 * Centralized error handling utilities
 *
 * Provides consistent error handling across the app with user-friendly
 * toast notifications for API errors and other exceptions.
 *
 * @example Handle API errors
 * ```tsx
 * import { handleApiError } from '@/lib/error-handler';
 *
 * try {
 *   await apiClient.post('/users', { body: data });
 * } catch (error) {
 *   handleApiError(error);
 * }
 * ```
 *
 * @example Use with TanStack Query
 * ```tsx
 * const mutation = useMutation({
 *   mutationFn: createUser,
 *   onError: handleApiError,
 * });
 * ```
 */

import { ApiError } from "./api-client";
import { toast } from "./toast";

/**
 * HTTP status code to user-friendly message mapping
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "Please sign in to continue.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  408: "Request timed out. Please try again.",
  409: "A conflict occurred. Please refresh and try again.",
  422: "Validation failed. Please check your input.",
  429: "Too many requests. Please wait a moment.",
  500: "Server error. Please try again later.",
  502: "Service temporarily unavailable. Please try again.",
  503: "Service unavailable. Please try again later.",
  504: "Request timed out. Please try again.",
};

/**
 * Default error message for unknown errors
 */
const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

/**
 * Network error message
 */
const NETWORK_ERROR_MESSAGE = "Network error. Please check your connection.";

/**
 * Error message extraction result
 */
interface ParsedError {
  message: string;
  isNetworkError: boolean;
  isAuthError: boolean;
  status?: number;
}

/**
 * Extract error message from various API response formats
 */
function extractErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const errorData = data as Record<string, unknown>;

  // Common API error response formats
  if (typeof errorData.message === "string") {
    return errorData.message;
  }

  if (typeof errorData.error === "string") {
    return errorData.error;
  }

  if (
    typeof errorData.error === "object" &&
    errorData.error !== null &&
    typeof (errorData.error as Record<string, unknown>).message === "string"
  ) {
    return (errorData.error as Record<string, unknown>).message as string;
  }

  // Handle validation errors array
  if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
    const firstError = errorData.errors[0];
    if (typeof firstError === "string") {
      return firstError;
    }
    if (
      typeof firstError === "object" &&
      firstError !== null &&
      typeof (firstError as Record<string, unknown>).message === "string"
    ) {
      return (firstError as Record<string, unknown>).message as string;
    }
  }

  return null;
}

/**
 * Parse an error into a user-friendly format
 */
function parseError(error: unknown): ParsedError {
  // Handle API errors
  if (error instanceof ApiError) {
    const apiMessage = extractErrorMessage(error.data);
    const httpMessage = HTTP_ERROR_MESSAGES[error.status];

    return {
      message: apiMessage || httpMessage || DEFAULT_ERROR_MESSAGE,
      isNetworkError: false,
      isAuthError: error.status === 401 || error.status === 403,
      status: error.status,
    };
  }

  // Handle network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      message: NETWORK_ERROR_MESSAGE,
      isNetworkError: true,
      isAuthError: false,
    };
  }

  // Handle abort errors
  if (error instanceof DOMException && error.name === "AbortError") {
    return {
      message: "Request was cancelled.",
      isNetworkError: false,
      isAuthError: false,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      message: error.message || DEFAULT_ERROR_MESSAGE,
      isNetworkError: false,
      isAuthError: false,
    };
  }

  // Handle string errors
  if (typeof error === "string") {
    return {
      message: error,
      isNetworkError: false,
      isAuthError: false,
    };
  }

  return {
    message: DEFAULT_ERROR_MESSAGE,
    isNetworkError: false,
    isAuthError: false,
  };
}

/**
 * Handle an API error by showing a toast notification
 *
 * @param error - The error to handle
 * @param customMessage - Optional custom message to show instead of the parsed error
 * @returns The parsed error for additional handling if needed
 */
export function handleApiError(
  error: unknown,
  customMessage?: string,
): ParsedError {
  const parsed = parseError(error);
  const message = customMessage || parsed.message;

  toast.error(message);

  return parsed;
}

/**
 * Handle a network error with specific messaging
 */
export function handleNetworkError(error: unknown): ParsedError {
  const parsed = parseError(error);

  if (parsed.isNetworkError) {
    toast.error(NETWORK_ERROR_MESSAGE);
  } else {
    toast.error(parsed.message);
  }

  return parsed;
}

/**
 * Get a user-friendly error message without showing a toast
 *
 * @param error - The error to parse
 * @returns The user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  return parseError(error).message;
}

/**
 * Check if an error is an authentication error (401 or 403)
 */
export function isAuthError(error: unknown): boolean {
  return parseError(error).isAuthError;
}

/**
 * Check if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return parseError(error).isNetworkError;
}
