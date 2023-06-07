import { type NextPage as DefaultNextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { type Colors } from '~/theme/colors';

export type LayoutConfig = {
  disableAuthButtons?: boolean;
  bodyBgColor?: Colors;
  subTitle?: string;
};

export type RouteData = {
  layoutConfig?: LayoutConfig;
  currentUser?: CurrentUserRes;
};

export type RouteProps = {
  layoutConfig?: LayoutConfig;
  getLayout?: (page: ReactElement, data?: RouteData) => ReactNode;
};

export type RouteServerProps = {
  [key: string]: unknown;
};

export type GlobalProps = {};

export type NextRoute<P = {}, IP = P> = DefaultNextPage<P & GlobalProps, IP> & RouteProps;

export type RouteConfig = {
  disableRedirect?: boolean;
  requireAuth?: boolean;
  permissions?: string[];
};
