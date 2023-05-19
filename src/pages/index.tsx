import { HeaderAuth } from '@/components/common/header-auth/header-auth';
import { useApiQuery } from '@/utils/api';
import { withSession } from '@/utils/withSession';
import { dehydrate } from '@tanstack/react-query';

const CONFIG_ROUTE = {
  requireAuth: false,
  // disableRedirect: true,
};

const LandingRoute = () => {
  const { data, isLoading } = useApiQuery(['posts'], '/posts');

  console.log('data', data);
  return (
    <div>
      <HeaderAuth /> Landing
    </div>
  );
};

export const getServerSideProps = withSession(async (ctx, client) => {
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
}, CONFIG_ROUTE);

export default LandingRoute;
