import { ConfigRoute } from '@/types/app';
import { QueryClient } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { apiRequest } from '@/utils/api';
import { authToken } from '@/utils/authToken';

import { accessRoute, REDIRECT_TO_SIGN_IN } from '@/utils/accessRoute';
import { useServerSideLogout } from '@/utils/useLogout';
import isEmpty from 'lodash/isEmpty';

export function withSession(
  getServerSideProps: (
    ...args: [...Parameters<GetServerSideProps>, QueryClient, boolean]
  ) => ReturnType<GetServerSideProps>,
  config: ConfigRoute
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { token } = authToken(ctx);

    const queryClient = new QueryClient();

    const logout = useServerSideLogout(queryClient, ctx);

    let access = {};

    if (!token && config.requireAuth !== false) {
      // access = REDIRECT_TO_SIGN_IN();
    }

    if (token) {
      try {
        const currentUser = await queryClient.fetchQuery(['getUser'], () =>
          apiRequest({ url: '/users/profile/', method: 'GET' }, { token })
        );

        console.log('currentUser2', currentUser);

        access = accessRoute(config, currentUser, config.disableRedirect);
      } catch (error) {
        await logout();
        access = REDIRECT_TO_SIGN_IN();
      }
    }

    const getServerSidePropsData = await getServerSideProps(
      ctx,
      queryClient,
      isEmpty(access)
    );

    return {
      ...getServerSidePropsData,
      ...access,
    };
  };
}
