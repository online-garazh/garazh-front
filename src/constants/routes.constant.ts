export enum RoutePaths {
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  FLEA_MARKET = '/flea-market',
  COMMUNITIES = '/communities',
  MY_GARAGE = '/my-garage',
  LOG_BOOKS = '/log-books',
  SETTINGS = '/settings',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  PROFILE = '/profile',
  INDEX = '/',
  SHOPS = '/shops',
  FEED = '/feed',
  CARS = '/cars',
}

export const NOT_AUTH_REDIRECT = RoutePaths.INDEX;
export const AUTH_REDIRECT = RoutePaths.FEED;

export enum RoutesBasicSubTitles {
  FORGOT_PASSWORD = 'Зміна паролю',
  RESET_PASSWORD = 'Новий пароль',
  COMMUNITIES = 'Спільноти',
  FLEA_MARKET = 'Барахолка',
  MY_GARAGE = 'Мій гараж',
  LOG_BOOKS = 'Бортжурнали',
  SETTINGS = 'Налаштування',
  SIGN_UP = 'Реєстрація',
  SIGN_IN = 'Вхід',
  PROFILE = 'Профіль',
  SHOPS = 'Автосервіси та магазини',
  INDEX = 'Домашня сторінка',
  FEED = 'Стрічка',
  CARS = 'Автомобілі',
}
