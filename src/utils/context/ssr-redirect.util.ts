import { NOT_AUTH_REDIRECT, type AUTH_REDIRECT, type RoutePaths } from '~/constants/routes.constant';

export type NotAuthRedirect = typeof NOT_AUTH_REDIRECT;
export type AuthRedirect = typeof AUTH_REDIRECT;

export type SsrRedirect = {
  redirect: {
    destination: RoutePaths | string;
    permanent: boolean;
  };
};

export const ssrRedirect = (
  to: string | NotAuthRedirect | AuthRedirect | RoutePaths = NOT_AUTH_REDIRECT,
  permanent = false
): SsrRedirect => ({
  redirect: {
    destination: to,
    permanent,
  },
});
