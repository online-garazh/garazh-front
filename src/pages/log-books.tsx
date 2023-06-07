import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/user-layout';
import { LogBooksView } from '~/components/views/log-books-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/route.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function LogBooksRoute() {
  return <LogBooksView />;
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

LogBooksRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.LOG_BOOKS,
};

LogBooksRoute.getLayout = getLayout;
