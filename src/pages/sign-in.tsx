import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth-layout';
import { SignInView } from '~/components/views/sign-in-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function SignInRoute(props: any) {
  console.info('SignInRoute props', props);

  return <SignInView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

SignInRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: RoutesBasicSubTitles.SIGN_IN,
};

SignInRoute.getLayout = getLayout;
