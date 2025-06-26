import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que os dados ficam "fresh" (não precisam ser refetchados)
      staleTime: 5 * 60 * 1000, // 5 minutos

      // Tempo que os dados ficam em cache
      gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)


      // Não refetch quando reconecta à internet
      refetchOnReconnect: false,

      // Não refetch automaticamente em intervalos
      refetchInterval: false,

      // Número de tentativas em caso de erro
      retry: 1,

      // Tempo entre tentativas
      retryDelay: 1000,
    },
    mutations: {
      // Número de tentativas para mutations
      retry: 1,
    },
  },
});

type Props = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
