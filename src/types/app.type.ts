import { type EmotionCache } from '@emotion/react';
import { type DehydratedState } from '@tanstack/react-query';
import { type AppProps as DefaultAppProps } from 'next/app';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';

import { type RouteServerProps, type NextRoute } from './route.type';

export type AppEnhancedProps = {
  emotionCache: EmotionCache;
};

export type AppProps = DefaultAppProps<
  RouteServerProps & { dehydratedState: DehydratedState; currentUser?: CurrentUserRes }
> &
  AppEnhancedProps & { Component: NextRoute };

export type CountryType = {
  label: string;
  value: string;
};
