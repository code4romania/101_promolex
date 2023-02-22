import {
  QueryClient,
  QueryClientProvider as QueryClientProviderCore,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProviderCore client={queryClient}>
      {children}
    </QueryClientProviderCore>
  );
}
