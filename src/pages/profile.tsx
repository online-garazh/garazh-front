import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { ProfileView } from '~/components/views/profile-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function ProfileRoute() {
  const { currentUser } = useCurrentUser();

  console.debug('currentUser', currentUser);

  return <ProfileView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

ProfileRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.PROFILE,
};

ProfileRoute.getLayout = getLayout;
