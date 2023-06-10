import { useRouter } from 'next/router';

import { RoutePaths } from '~/constants/routes.constant';
import { useNotification } from '~/hooks/use-notification.hook';
import { usePost } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';

export type SignInReq = {
  password: string;
  email: string;
};
export type SignInRes = {
  access_token: string;
};

export const usePostSignIn = () => {
  const router = useRouter();
  const { setAuthToken, removeAuthToken } = authService();
  const { addErrorMessage } = useNotification();
  const { mutate, isLoading } = usePost<SignInReq, SignInRes>({
    url: '/auth/login/',
    options: {
      onSuccess: (data) => {
        removeAuthToken();

        setAuthToken(data.access_token);

        void router.push(RoutePaths.FEED);
      },
      onError: (error) => {
        if (error.status === 400 && error.message === 'No user found') addErrorMessage('Користувача не знайдено');
      },
    },
  });

  return { mutate, isLoading };
};
