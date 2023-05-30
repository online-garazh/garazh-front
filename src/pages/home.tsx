import { dehydrate } from '@tanstack/react-query';
import Link from 'next/link';

import { HomeView } from '~/components/views/home-view';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { type RouteConfig } from '~/types/app.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: false,
};

export default function Home() {
  const { currentUser } = useCurrentUser();

  console.info('currentUser', currentUser);

  return (
    <>
      <HomeView />
      Home <Link href="/">go to landing</Link>
    </>
  );
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);
