import {
  QueryClient,
  QueryClientProvider as QueryClientProviderCore,
} from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProviderCore client={queryClient}>
      {children}
    </QueryClientProviderCore>
  );
};
