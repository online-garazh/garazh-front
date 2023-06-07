import { type QueryClient } from '@tanstack/react-query';
import { type GetServerSidePropsContext } from 'next';

import { authService } from '~/services/auth.service';

export const getServerSideLogout = (_client: QueryClient, ctx: GetServerSidePropsContext) => {
  const { removeAuthToken } = authService(ctx);

  return async () => {
    removeAuthToken();
  };
};
