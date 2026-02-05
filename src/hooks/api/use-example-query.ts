/**
 * Example Query Hook
 *
 * This file demonstrates the recommended pattern for creating TanStack Query hooks.
 * Use this as a template when building new API integrations.
 *
 * Key patterns demonstrated:
 * 1. Query key factory for consistent, type-safe cache keys
 * 2. Proper TypeScript generics with useQuery
 * 3. Separation of concerns (API calls in lib/api, hooks here)
 * 4. Options forwarding for flexibility
 *
 * @example Basic usage
 * ```tsx
 * function ExampleScreen() {
 *   const { data, isLoading, error } = useExampleQuery('123');
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *
 *   return <Text>{data.title}</Text>;
 * }
 * ```
 *
 * @example With options
 * ```tsx
 * const { data } = useExampleQuery('123', {
 *   enabled: isReady,
 *   staleTime: 60_000,
 * });
 * ```
 *
 * @example List query with filters
 * ```tsx
 * const { data } = useExamplesQuery({
 *   status: 'active',
 *   limit: 20,
 * });
 * ```
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
  Example,
  FetchExamplesParams,
  PaginatedResponse,
  fetchExampleById,
  fetchExamples,
} from '@/lib/api/example';

// ============================================================================
// Query Keys
// ============================================================================

/**
 * Query key factory for examples
 *
 * This pattern provides:
 * - Type-safe query keys
 * - Hierarchical invalidation (invalidate 'all' to clear all example queries)
 * - Consistent key structure across the app
 *
 * @example Invalidating queries
 * ```tsx
 * // Invalidate all example queries
 * queryClient.invalidateQueries({ queryKey: exampleKeys.all });
 *
 * // Invalidate only list queries
 * queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
 *
 * // Invalidate a specific detail query
 * queryClient.invalidateQueries({ queryKey: exampleKeys.detail('123') });
 * ```
 */
export const exampleKeys = {
  // Base key for all example-related queries
  all: ['examples'] as const,

  // Key for list queries (supports filtering)
  lists: () => [...exampleKeys.all, 'list'] as const,
  list: (params?: FetchExamplesParams) =>
    [...exampleKeys.lists(), params] as const,

  // Key for detail/single item queries
  details: () => [...exampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

// ============================================================================
// Query Hooks
// ============================================================================

/**
 * Hook to fetch a single example by ID
 *
 * @param id - The unique identifier of the example
 * @param options - Optional TanStack Query options for customization
 * @returns Query result with data, loading state, and error
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useExampleQuery('123');
 * ```
 */
export function useExampleQuery(
  id: string,
  options?: Omit<
    UseQueryOptions<Example, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => fetchExampleById(id),
    ...options,
  });
}

/**
 * Hook to fetch a paginated list of examples
 *
 * @param params - Optional filters and pagination parameters
 * @param options - Optional TanStack Query options for customization
 * @returns Query result with paginated data, loading state, and error
 *
 * @example Without filters
 * ```tsx
 * const { data } = useExamplesQuery();
 * ```
 *
 * @example With filters
 * ```tsx
 * const { data } = useExamplesQuery({ status: 'active', limit: 10 });
 * ```
 */
export function useExamplesQuery(
  params?: FetchExamplesParams,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Example>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: exampleKeys.list(params),
    queryFn: () => fetchExamples(params),
    ...options,
  });
}
