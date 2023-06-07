import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth-layout';
import { SignUpView } from '~/components/views/sign-up-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/route.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function SignUpRoute() {
  return <SignUpView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

SignUpRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: RoutesBasicSubTitles.SIGN_UP,
};

SignUpRoute.getLayout = getLayout;
