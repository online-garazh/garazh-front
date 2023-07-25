import { dehydrate } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';

import { getLayout } from '~/components/layouts/landing-layout';
import { LandingView } from '~/components/views/landing-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/route.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function LandingRoute() {
  return (
    <>
      <NextSeo title="Домашня сторінка" />
      <LandingView />
    </>
  );
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

LandingRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.INDEX,
};

LandingRoute.getLayout = getLayout;
