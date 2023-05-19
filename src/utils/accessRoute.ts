import { ConfigRoute } from '@/types/app';

export const REDIRECT_TO_SIGN_IN = (from?: string) => ({
  redirect: {
    destination: '/auth/login/',
    permanent: false,
  },
});

// const checkHasAccessRoute = (
//   hasPermissionsRoute: string[] = [],
//   userPermissions: IPermission[] = []
// ): boolean =>
//   hasPermissionsRoute.every((perm) =>
//     transformPermissionsToNames(userPermissions).includes(perm)
//   );

export const accessRoute = (
  config: ConfigRoute,
  currentUser?: any,
  disableRedirect?: boolean
) => {
  if (config.requireAuth && !currentUser) {
    return REDIRECT_TO_SIGN_IN();
  }

  if (config.requireAuth === false && currentUser && !disableRedirect) {
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };
  }

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
