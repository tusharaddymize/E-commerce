import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes

      gcTime: 30 * 60 * 1000, // 30 minutes

      refetchOnWindowFocus: false,

      refetchOnReconnect: false,

      retry: 1,
    },
  },
});

export default queryClient;