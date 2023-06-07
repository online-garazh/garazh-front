import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

import { AppProvider } from '~/providers/app.provider';
import { ThemeProvider } from '~/providers/theme.provider';
import { queryClientBaseConfig } from '~/react-query/react-query.config';
import { createEmotionCache } from '~/theme/create-emotion-cache';
import { type AppProps } from '~/types/app.type';
import { getRouteTitle } from '~/utils/get-route-title.util';

import '../styles/index.scss';

const AppLayout = dynamic(() => import('../components/layouts/app-layout').then((mod) => mod.AppLayout));
const clientSideEmotionCache = createEmotionCache();

export const rubik = Rubik({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { dehydratedState, currentUser, ...restPageProps } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);
  const title = getRouteTitle(Component.layoutConfig?.subTitle);
  const [queryClient] = useState(() => new QueryClient({ ...queryClientBaseConfig }));

  console.info('pageProps', pageProps);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ThemeProvider emotionCache={emotionCache}>
            <AppProvider layoutConfig={Component.layoutConfig}>
              <AppLayout>
                {getLayout(<Component {...restPageProps} />, {
                  layoutConfig: Component.layoutConfig,
                  currentUser,
                })}
              </AppLayout>
            </AppProvider>
          </ThemeProvider>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
