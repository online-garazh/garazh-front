import { type EmotionCache } from '@emotion/react';
import { type DehydratedState } from '@tanstack/react-query';
import { type AppProps as DefaultAppProps } from 'next/app';

import { type PageServerProps, type NextPage } from './page.type';

export type AppEnhancedProps = {
  emotionCache: EmotionCache;
};

export type AppProps = DefaultAppProps<PageServerProps & { dehydratedState: DehydratedState }> &
  AppEnhancedProps & { Component: NextPage };

export type RouteConfig = {
  disableRedirect?: boolean;
  requireAuth?: boolean;
  permissions?: string[];
};

export type ObjectType = { [key: string]: any };
