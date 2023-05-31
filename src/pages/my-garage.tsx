import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { MyGarageView } from '~/components/views/my-garage-view';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function MyGarageRoute() {
  const { currentUser } = useCurrentUser();

  console.debug('currentUser', currentUser);

  return <MyGarageView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

MyGarageRoute.layoutConfig = {
  subTitle: PagesSubTitles.MY_GARAGE,
};

MyGarageRoute.getLayout = getLayout;
