import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { CommunitiesView } from '~/components/views/communities-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function CommunitiesRoute() {
  return <CommunitiesView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

CommunitiesRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.COMMUNITIES,
};

CommunitiesRoute.getLayout = getLayout;
