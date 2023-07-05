import { useRouter } from 'next/router';

import { RoutePaths } from '~/constants/routes.constant';
import { usePost } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';

export type ResetPasswordReq = {
  resetToken: string;
  password: string;
};
export type ResetPasswordRes = {
  access_token: string;
};

export const usePostResetPassword = () => {
  const router = useRouter();
  const { setAuthToken, removeAuthToken } = authService();
  const { mutate, isLoading } = usePost<ResetPasswordReq, ResetPasswordRes>({
    url: '/auth/reset-password/',
    options: {
      onSuccess: (data) => {
        removeAuthToken();

        setAuthToken(data.access_token);

        void router.push(RoutePaths.FEED);
      },
      onError: (error) => {
        console.error('usePostResetPassword', error);
      },
    },
  });

  return { mutate, isLoading };
};
