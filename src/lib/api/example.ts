/**
 * Example API functions
 *
 * This file demonstrates the pattern for organizing API calls.
 * Each API module should:
 * - Export typed functions that use the apiClient
 * - Define request/response types alongside the functions
 * - Group related endpoints together
 *
 * @example Using these API functions
 * ```tsx
 * import { fetchExampleById, fetchExamples } from '@/lib/api/example';
 *
 * // Fetch a single item
 * const item = await fetchExampleById('123');
 *
 * // Fetch with filters
 * const items = await fetchExamples({ status: 'active', limit: 10 });
 * ```
 */

import { apiClient } from '../api-client';

// ============================================================================
// Types
// ============================================================================

/**
 * Example entity returned by the API
 *
 * Define your response types here. These should match your API contract.
 */
export interface Example {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

/**
 * Parameters for fetching a list of examples
 *
 * Define query parameter types for list endpoints.
 */
export interface FetchExamplesParams {
  status?: Example['status'];
  limit?: number;
  offset?: number;
  search?: string;
}

/**
 * Paginated response wrapper
 *
 * Common pattern for list endpoints with pagination.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch a single example by ID
 *
 * @param id - The unique identifier of the example
 * @returns The example entity
 * @throws ApiError if the request fails
 */
export function fetchExampleById(id: string): Promise<Example> {
  return apiClient.get<Example>(`/examples/${id}`);
}

/**
 * Fetch a paginated list of examples
 *
 * @param params - Optional filters and pagination parameters
 * @returns Paginated list of examples
 * @throws ApiError if the request fails
 */
export function fetchExamples(
  params?: FetchExamplesParams
): Promise<PaginatedResponse<Example>> {
  return apiClient.get<PaginatedResponse<Example>>('/examples', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
}
