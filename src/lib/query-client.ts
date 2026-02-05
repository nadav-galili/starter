import { QueryClient } from "@tanstack/react-query";

import { handleApiError } from "./error-handler";

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
       * Retry failed queries up to 3 times with exponential backoff
       */
      retry: 3,

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
       * Retry failed mutations once
       */
      retry: 1,

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
