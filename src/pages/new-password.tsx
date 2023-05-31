import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth-layout';
import { NewPasswordView } from '~/components/views/new-password-view';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function NewPasswordRoute() {
  return <NewPasswordView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

NewPasswordRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: PagesSubTitles.NEW_PASSWORD,
};

NewPasswordRoute.getLayout = getLayout;
