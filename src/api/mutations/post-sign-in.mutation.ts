import { useRouter } from 'next/router';

import { RoutePaths } from '~/constants/routes.constant';
import { usePost } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';

export type SignInReq = { email: string; password: string };
export type SignInRes = { access_token: string };

export const usePostSignIn = () => {
  const router = useRouter();
  const { setAuthToken, removeAuthToken } = authService();
  const { mutate, isLoading } = usePost<SignInReq, SignInRes>({
    url: '/auth/login/',
    options: {
      onSuccess: (data) => {
        removeAuthToken();

        setAuthToken(data.access_token);

        void router.push(RoutePaths.FEED);
      },
      onError: (error) => {
        console.debug('usePostSignInERROR', error);
      },
    },
  });

  return { mutate, isLoading };
};
