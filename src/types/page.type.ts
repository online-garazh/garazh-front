import { type NextPage as DefaultNextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';

import { type Colors } from '~/theme/colors';

export type LayoutConfig = {
  bodyBgColor?: Colors;
  subTitle?: string;
};

export type PageProps = {
  layoutConfig?: LayoutConfig;
  getLayout?: (page: ReactElement, layoutConfig?: LayoutConfig) => ReactNode;
};

export type PageServerProps = {
  [key: string]: unknown;
};

export type GlobalProps = {};

export type NextPage<P = {}, IP = P> = DefaultNextPage<P & GlobalProps, IP> & PageProps;

export enum PagesSubTitles {
  // Auth pages
  FORGOT_PASSWORD = 'Forgot password',
  NEW_PASSWORD = 'New password',
  SIGN_UP = 'Реєстрація',
  SIGN_IN = 'Вхід',
  // Landing page
  INDEX = 'Landing',
  // My own profile pages
  SETTINGS = 'Settings',
  PROFILE = 'Profile',
  HOME = 'Home',
}
