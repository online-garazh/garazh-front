import { HomeView } from '@/components/views/home-view/home-view';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { withSession } from '@/utils/withSession';
import { dehydrate } from '@tanstack/react-query';
import Link from 'next/link';

const CONFIG_ROUTE = {
  requireAuth: false,
  disableRedirect: true,
};

const Home = () => {
  const { currentUser } = useCurrentUser();

  console.log('currentUser', currentUser);

  return (
    <>
      <HomeView />
      Home <Link href="/">go to landing</Link>
    </>
  );
};

export const getServerSideProps = withSession(async (ctx, client) => {
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
}, CONFIG_ROUTE);

export default Home;
