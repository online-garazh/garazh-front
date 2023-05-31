import { dehydrate } from '@tanstack/react-query';

import { HomeView } from '~/components/views/home-view';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function HomeRoute() {
  const { currentUser } = useCurrentUser();

  console.debug('currentUser', currentUser);

  return <HomeView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);
