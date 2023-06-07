import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { AUTH_REDIRECT, NOT_AUTH_REDIRECT } from '~/constants/routes.constant';
import { type RouteConfig } from '~/types/app.type';
import { ssrRedirect } from '~/utils/context/ssr-redirect.util';

// const checkHasAccessRoute = (
//   hasPermissionsRoute: string[] = [],
//   userPermissions: IPermission[] = []
// ): boolean =>
//   hasPermissionsRoute.every((perm) =>
//     transformPermissionsToNames(userPermissions).includes(perm)
//   );

export const getRouteAccess = (config: RouteConfig, currentUser?: CurrentUserRes, disableRedirect?: boolean) => {
  if (config.requireAuth && !currentUser) return ssrRedirect(NOT_AUTH_REDIRECT);

  if (config.requireAuth === false && currentUser && !disableRedirect) return ssrRedirect(AUTH_REDIRECT);

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
