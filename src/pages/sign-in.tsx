import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth-layout';
import { SignInView } from '~/components/views/sign-in-view';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function SignInRoute() {
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
  subTitle: PagesSubTitles.SIGN_IN,
};

SignInRoute.getLayout = getLayout;
