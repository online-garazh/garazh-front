import dynamic from 'next/dynamic';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { memo } from 'react';

import { DefaultSeo } from '~/components/common/default-seo';
import { AppProvider } from '~/providers/app.provider';
import { QueryProvider } from '~/providers/query.provider';
import { ThemeProvider } from '~/providers/theme.provider';
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

// Memoize it so that default seo never overrides page seo
const MemoizedDefaultSeo = memo(DefaultSeo, () => true);

export default function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { dehydratedState, currentUser, ...restPageProps } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);
  const title = getRouteTitle(Component.layoutConfig?.subTitle);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <MemoizedDefaultSeo />

      <QueryProvider dehydratedState={dehydratedState}>
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
      </QueryProvider>
    </>
  );
}
