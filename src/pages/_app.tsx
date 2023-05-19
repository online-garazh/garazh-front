import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

import { ToggleColorMode } from '@/themes/ThemeProvider';
import createEmotionCache from '@/themes/helper';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Rubik } from 'next/font/google';

export const rubik = Rubik({
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [queryClient] = React.useState(() => new QueryClient());

  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  console.log('showDevtools', showDevtools);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToggleColorMode emotionCache={emotionCache}>
            <Component {...pageProps} />
          </ToggleColorMode>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
