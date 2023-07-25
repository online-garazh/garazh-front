import { dehydrate } from '@tanstack/react-query';

import { ResetPasswordView } from 'src/components/views/reset-password-view';
import { getLayout } from '~/components/layouts/auth-layout';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/route.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function ResetPasswordRoute() {
  return <ResetPasswordView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

ResetPasswordRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: RoutesBasicSubTitles.RESET_PASSWORD,
};

ResetPasswordRoute.getLayout = getLayout;
