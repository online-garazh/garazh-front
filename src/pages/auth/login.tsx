import { LoginView } from '@/components/views/auth/login-view/login-view';
import { ConfigRoute } from '@/types/app';
import { withSession } from '@/utils/withSession';
import { dehydrate } from '@tanstack/react-query';

const CONFIG_ROUTE: ConfigRoute = {
  requireAuth: false,
};

export interface LoginRouteProps {}

export default function SignUpRoute(props: LoginRouteProps) {
  return <LoginView />;
}

export const getServerSideProps = withSession(async (ctx, client) => {
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
}, CONFIG_ROUTE);
