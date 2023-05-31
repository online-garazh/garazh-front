import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { FeedView } from '~/components/views/feed-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function FeedRoute() {
  const { currentUser } = useCurrentUser();

  console.debug('currentUser', currentUser);

  return <FeedView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

FeedRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.FEED,
};

FeedRoute.getLayout = getLayout;
