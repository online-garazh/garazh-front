import { deleteCookie, getCookies, setCookie } from 'cookies-next';

import { TOKEN_NAME } from '@/constants/constants';
import { GetServerSidePropsContext } from 'next';

export const authToken = (ctx?: GetServerSidePropsContext) => {
  const token = getCookies(ctx)[TOKEN_NAME];

  const getAuthToken = () => getCookies(ctx)[TOKEN_NAME] ?? null;

  const setAuthToken = (token: string) => setCookie(TOKEN_NAME, token);

  const removeAuthToken = () =>
    deleteCookie(TOKEN_NAME, { req: ctx?.req, res: ctx?.res });

  return {
    token,
    getAuthToken,
    setAuthToken,
    removeAuthToken,
  };
};
