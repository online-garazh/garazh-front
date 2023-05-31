import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth-layout';
import { ForgotPasswordView } from '~/components/views/forgot-password-view';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

ForgotPasswordRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: PagesSubTitles.FORGOT_PASSWORD,
};

ForgotPasswordRoute.getLayout = getLayout;
