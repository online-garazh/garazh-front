export enum RoutePaths {
  FORGOT_PASSWORD = '/forgot-password',
  NEW_PASSWORD = '/new-password',
  MY_GARAGE = '/my-garage',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  SETTINGS = '/settings',
  PROFILE = '/profile',
  INDEX = '/',
  FEED = '/feed',
}

export const NOT_AUTH_REDIRECT = RoutePaths.SIGN_IN;
export const AUTH_REDIRECT = RoutePaths.FEED;

export enum RoutesBasicSubTitles {
  FORGOT_PASSWORD = 'Зміна паролю',
  NEW_PASSWORD = 'Новий пароль',
  MY_GARAGE = 'Мій гараж',
  SETTINGS = 'Налаштування',
  SIGN_UP = 'Реєстрація',
  SIGN_IN = 'Вхід',
  PROFILE = 'Профіль',
  INDEX = 'Домашня сторінка',
  FEED = 'Стрічка',
}
