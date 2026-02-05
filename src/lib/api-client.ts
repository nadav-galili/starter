/**
 * Typed fetch-based API client
 *
 * Provides a consistent interface for making HTTP requests with
 * automatic base URL prefixing, proper headers, and typed responses.
 *
 * @example Basic GET request
 * ```tsx
 * import { apiClient } from '@/lib/api-client';
 *
 * const users = await apiClient.get<User[]>('/users');
 * ```
 *
 * @example POST request with body
 * ```tsx
 * const newUser = await apiClient.post<User>('/users', {
 *   body: { name: 'John', email: 'john@example.com' }
 * });
 * ```
 *
 * @example With custom headers
 * ```tsx
 * const data = await apiClient.get<Data>('/protected', {
 *   headers: { Authorization: 'Bearer token' }
 * });
 * ```
 */

import { env } from '@/config/env';

/**
 * HTTP methods supported by the API client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request configuration options
 */
export interface RequestOptions<TBody = unknown> {
  headers?: Record<string, string>;
  body?: TBody;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

/**
 * API error with status code and response data
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const baseUrl = path.startsWith('http') ? '' : env.API_BASE_URL;
  const url = new URL(path, baseUrl || undefined);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Core fetch function with typed response
 */
async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { headers = {}, body, params, signal } = options;

  const url = buildUrl(path, params);

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  let data: unknown;
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text || null;
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      data
    );
  }

  return data as TResponse;
}

/**
 * API client with typed methods for all HTTP verbs
 */
export const apiClient = {
  /**
   * Make a GET request
   */
  get<TResponse>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return request<TResponse>(
      'GET',
      path,
      options as RequestOptions<undefined>
    );
  },

  /**
   * Make a POST request
   */
  post<TResponse, TBody = unknown>(path: string, options?: RequestOptions<TBody>) {
    return request<TResponse, TBody>('POST', path, options);
  },

  /**
   * Make a PUT request
   */
  put<TResponse, TBody = unknown>(path: string, options?: RequestOptions<TBody>) {
    return request<TResponse, TBody>('PUT', path, options);
  },

  /**
   * Make a PATCH request
   */
  patch<TResponse, TBody = unknown>(path: string, options?: RequestOptions<TBody>) {
    return request<TResponse, TBody>('PATCH', path, options);
  },

  /**
   * Make a DELETE request
   */
  delete<TResponse>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return request<TResponse>(
      'DELETE',
      path,
      options as RequestOptions<undefined>
    );
  },
};
