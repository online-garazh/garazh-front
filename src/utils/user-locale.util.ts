import { isServer } from './context/is-server.util';

export const userLocale = (): string => {
  if (isServer()) return 'en-US'; // fallback to en-US

  return window.navigator['language'] || 'en-US';
};
