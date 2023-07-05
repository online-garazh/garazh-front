import { type DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import { queryClientBaseConfig } from '~/react-query/react-query.config';

type Props = {
  dehydratedState: DehydratedState;
  children: ReactNode;
};

export function QueryProvider(props: Props) {
  const { dehydratedState, children } = props;
  const [queryClient] = useState(() => new QueryClient({ ...queryClientBaseConfig }));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        {children}
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
