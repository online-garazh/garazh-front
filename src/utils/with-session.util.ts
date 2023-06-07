import { QueryClient } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { type GetServerSideProps, type GetServerSidePropsContext } from 'next';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { ssrFetch } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';
import { type RouteConfig } from '~/types/route.type';
import { getRouteAccess } from '~/utils/get-route-access.util';
import { getServerSideLogout } from '~/utils/get-server-side-logout';

export function withSession(
  callback: (...args: [...Parameters<GetServerSideProps>, QueryClient, boolean]) => ReturnType<GetServerSideProps>,
  config: RouteConfig
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { token } = authService(ctx);
    const queryClient = new QueryClient();
    const logout = getServerSideLogout(queryClient, ctx);
    let currentUser: CurrentUserRes | undefined;
    let access = {};

    if (token)
      try {
        currentUser = await ssrFetch({
          extraOptions: { token },
          url: '/users/profile',
        });

        console.debug('currentUser', currentUser);
      } catch (error) {
        await logout();
      }

    access = getRouteAccess(config, currentUser, config.disableRedirect);

    const result = await callback(ctx, queryClient, isEmpty(access));

    // For return { notFound: true } logic
    if (!('props' in result))
      return {
        ...result,
      };

    return {
      ...result,
      props: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...result.props,
        ...(currentUser ? { currentUser } : {}),
      },
      ...access,
    };
  };
}
