import { NextComponentType, NextPage, NextPageContext } from 'next';
// import { NextSeoProps } from 'next-seo';
import { LayoutsEnum, TConfigLayoutType } from '@/types/ui';
import { AppProps } from 'next/app';

type Layout = {
  layout: { getLayout: LayoutsEnum; configLayout?: TConfigLayoutType };
};

export type ExtendedNextPage = Layout & {
  configLayout?: TConfigLayoutType;
};

export type TComponent = NextComponentType<
  NextPageContext,
  never,
  Record<string, unknown>
> &
  ExtendedNextPage;

export interface CustomAppProps extends AppProps {
  Component: TComponent;
}

export type NextPageEnhanced<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  layout?: { getLayout: LayoutsEnum; configLayout?: TConfigLayoutType };
  // seo?: NextSeoProps;
};

export type ConfigRoute = {
  requireAuth?: boolean;
  disableRedirect?: boolean;
  permissions?: string[];
};

export type ObjectType = { [key: string]: any };

export type GraphQlLocalError = {
  field: string;
  message: string;
};
