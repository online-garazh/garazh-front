import { NOT_AUTH_REDIRECT } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/app.type';
import { ssrRedirect } from '~/utils/context/ssr-redirect.util';

// const checkHasAccessRoute = (
//   hasPermissionsRoute: string[] = [],
//   userPermissions: IPermission[] = []
// ): boolean =>
//   hasPermissionsRoute.every((perm) =>
//     transformPermissionsToNames(userPermissions).includes(perm)
//   );

export const getRouteAccess = (config: RouteConfig, currentUser?: any, disableRedirect?: boolean) => {
  if (config.requireAuth && !currentUser) return ssrRedirect(NOT_AUTH_REDIRECT);

  if (config.requireAuth === false && currentUser && !disableRedirect)
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };

  // const hasAccessRoute = checkHasAccessRoute(
  //   config?.permissions,
  //   currentUser?.role?.permissions
  // );

  // if (!hasAccessRoute) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {};
};
