import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { FleaMarketView } from '~/components/views/flea-market-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function FleaMarketRoute() {
  return <FleaMarketView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

FleaMarketRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.FLEA_MARKET,
};

FleaMarketRoute.getLayout = getLayout;
