/**
 * Example Mutation Hook
 *
 * This file demonstrates the recommended pattern for creating TanStack Query
 * mutation hooks for POST/PUT/DELETE operations. Use this as a template
 * when building new API integrations that modify server state.
 *
 * Key patterns demonstrated:
 * 1. Optimistic updates for instant UI feedback
 * 2. Error handling with toast notifications
 * 3. Cache invalidation after successful mutations
 * 4. Rollback on error for optimistic updates
 * 5. Proper TypeScript generics with useMutation
 *
 * @example Basic create mutation
 * ```tsx
 * function CreateExampleForm() {
 *   const createMutation = useCreateExampleMutation();
 *
 *   const handleSubmit = (data: CreateExampleInput) => {
 *     createMutation.mutate(data, {
 *       onSuccess: (newExample) => {
 *         navigation.navigate('ExampleDetail', { id: newExample.id });
 *       },
 *     });
 *   };
 *
 *   return (
 *     <Button
 *       onPress={() => handleSubmit(formData)}
 *       disabled={createMutation.isPending}
 *     />
 *   );
 * }
 * ```
 *
 * @example Update with optimistic updates
 * ```tsx
 * function ExampleItem({ example }: { example: Example }) {
 *   const updateMutation = useUpdateExampleMutation();
 *
 *   // The UI updates immediately, then syncs with server
 *   const handleToggleStatus = () => {
 *     updateMutation.mutate({
 *       id: example.id,
 *       data: { status: example.status === 'active' ? 'archived' : 'active' },
 *     });
 *   };
 *
 *   return <Switch onValueChange={handleToggleStatus} value={example.status === 'active'} />;
 * }
 * ```
 *
 * @example Delete with confirmation
 * ```tsx
 * function DeleteButton({ id }: { id: string }) {
 *   const deleteMutation = useDeleteExampleMutation();
 *
 *   const handleDelete = () => {
 *     Alert.alert('Delete?', 'This action cannot be undone.', [
 *       { text: 'Cancel', style: 'cancel' },
 *       {
 *         text: 'Delete',
 *         style: 'destructive',
 *         onPress: () => deleteMutation.mutate(id),
 *       },
 *     ]);
 *   };
 *
 *   return <Button title="Delete" onPress={handleDelete} />;
 * }
 * ```
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  Example,
  PaginatedResponse,
  createExample,
  updateExample,
  deleteExample,
  CreateExampleInput,
  UpdateExampleInput,
} from '@/lib/api/example';
import { toast } from '@/lib/toast';

import { exampleKeys } from './use-example-query';

// ============================================================================
// Create Mutation
// ============================================================================

/**
 * Hook to create a new example
 *
 * This demonstrates a basic mutation pattern with:
 * - Success toast notification
 * - Error handling with toast
 * - Cache invalidation to refresh lists
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutate, isPending } = useCreateExampleMutation();
 * mutate({ title: 'New Example', description: 'Description' });
 * ```
 */
export function useCreateExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutation function - calls the API
    mutationFn: (input: CreateExampleInput) => createExample(input),

    // Called when mutation succeeds
    onSuccess: (newExample) => {
      // Show success feedback to user
      toast.success('Example created successfully');

      // Invalidate list queries to refetch with new data
      // This ensures lists show the newly created item
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });

      // Optionally, you can also set the new item directly in cache
      // This avoids an extra fetch if user navigates to detail view
      queryClient.setQueryData(exampleKeys.detail(newExample.id), newExample);
    },

    // Called when mutation fails
    onError: (error) => {
      // Show error feedback to user
      toast.error(error.message || 'Failed to create example');

      // You could also log to error tracking service here
      // errorTracker.captureException(error);
    },
  });
}

// ============================================================================
// Update Mutation with Optimistic Updates
// ============================================================================

/**
 * Input for update mutation including the ID
 */
interface UpdateMutationInput {
  id: string;
  data: UpdateExampleInput;
}

/**
 * Context saved for rollback on error
 */
interface UpdateMutationContext {
  previousExample: Example | undefined;
  previousList: PaginatedResponse<Example> | undefined;
}

/**
 * Hook to update an existing example with optimistic updates
 *
 * This demonstrates the optimistic update pattern:
 * 1. onMutate: Update cache immediately before API call
 * 2. onError: Rollback to previous state if API fails
 * 3. onSettled: Always invalidate to ensure consistency
 *
 * Optimistic updates provide instant feedback to users while
 * the actual API call happens in the background. If the call
 * fails, we rollback to the previous state.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutate } = useUpdateExampleMutation();
 * mutate({ id: '123', data: { title: 'Updated Title' } });
 * ```
 */
export function useUpdateExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation<Example, Error, UpdateMutationInput, UpdateMutationContext>({
    // The mutation function - calls the API
    mutationFn: ({ id, data }) => updateExample(id, data),

    // Called BEFORE the mutation function
    // Use this for optimistic updates
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches to prevent race conditions
      // This ensures our optimistic update isn't overwritten
      await queryClient.cancelQueries({ queryKey: exampleKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: exampleKeys.lists() });

      // Snapshot the previous value for potential rollback
      const previousExample = queryClient.getQueryData<Example>(
        exampleKeys.detail(id)
      );

      // Snapshot list data too (we'll update the item in the list)
      const previousList = queryClient.getQueryData<PaginatedResponse<Example>>(
        exampleKeys.list()
      );

      // Optimistically update the detail cache
      if (previousExample) {
        queryClient.setQueryData<Example>(exampleKeys.detail(id), {
          ...previousExample,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }

      // Optimistically update the item in list cache
      if (previousList) {
        queryClient.setQueryData<PaginatedResponse<Example>>(
          exampleKeys.list(),
          {
            ...previousList,
            data: previousList.data.map((item) =>
              item.id === id
                ? { ...item, ...data, updatedAt: new Date().toISOString() }
                : item
            ),
          }
        );
      }

      // Return context with snapshots for rollback
      return { previousExample, previousList };
    },

    // Called when mutation succeeds
    onSuccess: () => {
      toast.success('Example updated successfully');
    },

    // Called when mutation fails
    // Use context to rollback optimistic updates
    onError: (error, { id }, context) => {
      // Rollback detail cache to previous state
      if (context?.previousExample) {
        queryClient.setQueryData(exampleKeys.detail(id), context.previousExample);
      }

      // Rollback list cache to previous state
      if (context?.previousList) {
        queryClient.setQueryData(exampleKeys.list(), context.previousList);
      }

      // Show error feedback
      toast.error(error.message || 'Failed to update example');
    },

    // Called after success OR error
    // Always invalidate to ensure cache consistency with server
    onSettled: (_data, _error, { id }) => {
      // Invalidate to refetch fresh data from server
      // This ensures any server-side changes are reflected
      queryClient.invalidateQueries({ queryKey: exampleKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}

// ============================================================================
// Delete Mutation with Optimistic Updates
// ============================================================================

/**
 * Context saved for rollback on delete error
 */
interface DeleteMutationContext {
  previousExample: Example | undefined;
  previousList: PaginatedResponse<Example> | undefined;
}

/**
 * Hook to delete an example with optimistic updates
 *
 * This demonstrates optimistic deletion:
 * 1. Immediately remove from cache for instant UI feedback
 * 2. Rollback if the API call fails
 * 3. Clean up detail cache on success
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutate, isPending } = useDeleteExampleMutation();
 * mutate('123'); // Pass the ID to delete
 * ```
 */
export function useDeleteExampleMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, DeleteMutationContext>({
    // The mutation function - calls the API
    mutationFn: (id: string) => deleteExample(id),

    // Optimistically remove the item before API call
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: exampleKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: exampleKeys.lists() });

      // Snapshot for rollback
      const previousExample = queryClient.getQueryData<Example>(
        exampleKeys.detail(id)
      );
      const previousList = queryClient.getQueryData<PaginatedResponse<Example>>(
        exampleKeys.list()
      );

      // Optimistically remove from list cache
      if (previousList) {
        queryClient.setQueryData<PaginatedResponse<Example>>(
          exampleKeys.list(),
          {
            ...previousList,
            data: previousList.data.filter((item) => item.id !== id),
            total: previousList.total - 1,
          }
        );
      }

      // Remove from detail cache (mark as deleted)
      queryClient.removeQueries({ queryKey: exampleKeys.detail(id) });

      return { previousExample, previousList };
    },

    // Called on success
    onSuccess: () => {
      toast.success('Example deleted successfully');
    },

    // Rollback on error
    onError: (error, id, context) => {
      // Restore detail cache
      if (context?.previousExample) {
        queryClient.setQueryData(exampleKeys.detail(id), context.previousExample);
      }

      // Restore list cache
      if (context?.previousList) {
        queryClient.setQueryData(exampleKeys.list(), context.previousList);
      }

      toast.error(error.message || 'Failed to delete example');
    },

    // Always invalidate to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
