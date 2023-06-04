import { QueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { type GetServerSideProps, type GetServerSidePropsContext } from 'next';

import { NOT_AUTH_REDIRECT } from '~/constants/routes.constant';
import { authService } from '~/services/auth.service';
import { type RouteConfig } from '~/types/app.type';
import { apiRequest } from '~/utils/api';
import { ssrRedirect } from '~/utils/context/ssr-redirect.util';
import { getRouteAccess } from '~/utils/get-route-access.util';
import { getServerSideLogout } from '~/utils/get-server-side-logout';

export function withSession(
  getServerSideProps: (
    ...args: [...Parameters<GetServerSideProps>, QueryClient, boolean]
  ) => ReturnType<GetServerSideProps>,
  config: RouteConfig
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { token } = authService(ctx);
    const queryClient = new QueryClient();
    const logout = getServerSideLogout(queryClient, ctx);
    let access = {};

    if (!token && config.requireAuth !== false) {
      // access = REDIRECT_TO_SIGN_IN();
    }

    if (token)
      try {
        const currentUser = await queryClient.fetchQuery(['/users/profile/'], () =>
          apiRequest({ url: '/users/profile/', method: 'GET' }, { token })
        );

        access = getRouteAccess(config, currentUser, config.disableRedirect);
      } catch (error) {
        await logout();

        access = ssrRedirect(NOT_AUTH_REDIRECT);
      }

    const getServerSidePropsData = await getServerSideProps(ctx, queryClient, isEmpty(access));

    return {
      ...getServerSidePropsData,
      ...access,
    };
  };
}
