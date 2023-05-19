import { authToken } from '@/utils/authToken';
import { QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

export const useServerSideLogout = (
  client: QueryClient,
  ctx: GetServerSidePropsContext
  // options?: LogoutOptions
) => {
  const { removeAuthToken } = authToken(ctx);

  return async () => {
    const actions = [];
    // const shouldNotifyServer = options?.shouldNotifyServer ?? true;
    //
    // if (shouldNotifyServer) {
    //   actions.push(client.mutate({ mutation: LOGOUT_MUTATION }));
    // }
    // actions.push(client.clearStore());
    //
    // await Promise.all(actions);
    removeAuthToken();
  };
};
