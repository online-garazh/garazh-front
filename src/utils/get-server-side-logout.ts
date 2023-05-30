import { type QueryClient } from '@tanstack/react-query';
import { type GetServerSidePropsContext } from 'next';

import { authService } from '~/services/auth.service';

export const getServerSideLogout = (
  _client: QueryClient,
  ctx: GetServerSidePropsContext
  // options?: LogoutOptions
) => {
  const { removeAuthToken } = authService(ctx);

  return async () => {
    // const actions = [];

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
