import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { type GetServerSidePropsContext } from 'next';

import { ACCESS_TOKEN_NAME } from '~/constants/system.constant';

export const authService = (ctx?: GetServerSidePropsContext) => {
  const token = getCookies(ctx)[ACCESS_TOKEN_NAME];
  const getAuthToken = () => getCookies(ctx)[ACCESS_TOKEN_NAME] ?? null;
  const setAuthToken = (token: string) => setCookie(ACCESS_TOKEN_NAME, token);
  const removeAuthToken = () => deleteCookie(ACCESS_TOKEN_NAME, { req: ctx?.req, res: ctx?.res });

  return {
    removeAuthToken,
    getAuthToken,
    setAuthToken,
    token,
  };
};
