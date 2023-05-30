import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

import { AppLayout } from '~/components/layouts/app-layout';
import { PAGE_BASE_TITLE } from '~/constants/seo.constant';
import { AppProvider } from '~/providers/app.provider';
import { ThemeProvider } from '~/providers/theme.provider';
import { createEmotionCache } from '~/theme/create-emotion-cache';
import { type AppProps } from '~/types/app.type';

import '../styles/index.scss';

const clientSideEmotionCache = createEmotionCache();

export const rubik = Rubik({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { dehydratedState, ...restPageProps } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);
  const subTitle = Component.layoutConfig?.subTitle || '';
  const modifiedSubTitle = subTitle ? ` | ${subTitle}` : '';
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>{`${PAGE_BASE_TITLE}${modifiedSubTitle}`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ThemeProvider emotionCache={emotionCache}>
            <AppProvider layoutConfig={Component.layoutConfig}>
              <AppLayout>{getLayout(<Component {...restPageProps} />, Component.layoutConfig)}</AppLayout>
            </AppProvider>
          </ThemeProvider>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
