export enum RoutePaths {
  // Auth pages
  FORGOT_PASSWORD = '/forgot-password',
  NEW_PASSWORD = '/new-password',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  // Landing page
  INDEX = '/',
  // My own profile pages
  SETTINGS = '/settings',
  PROFILE = '/profile',
  HOME = '/home',
}

export const NOT_AUTH_REDIRECT = RoutePaths.SIGN_IN;
export const AUTH_REDIRECT = RoutePaths.HOME;
