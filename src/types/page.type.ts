import { type NextPage as DefaultNextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { type Colors } from '~/theme/colors';

export type LayoutConfig = {
  disableAuthButtons?: boolean;
  bodyBgColor?: Colors;
  subTitle?: string;
};

export type PageData = {
  layoutConfig?: LayoutConfig;
  currentUser?: CurrentUserRes;
};

export type PageProps = {
  layoutConfig?: LayoutConfig;
  getLayout?: (page: ReactElement, data?: PageData) => ReactNode;
};

export type PageServerProps = {
  [key: string]: unknown;
};

export type GlobalProps = {};

export type NextPage<P = {}, IP = P> = DefaultNextPage<P & GlobalProps, IP> & PageProps;
