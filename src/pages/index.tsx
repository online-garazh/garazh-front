import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/landing-layout';
import { LandingView } from '~/components/views/landing-view';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function LandingRoute() {
  return <LandingView />;
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
  subTitle: PagesSubTitles.INDEX,
};

LandingRoute.getLayout = getLayout;
