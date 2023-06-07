import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { NOT_AUTH_REDIRECT } from '~/constants/routes.constant';
import { authService } from '~/services/auth.service';

export const useCurrentUserLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { removeAuthToken } = authService();

  return async () => {
    removeAuthToken();

    queryClient.clear();

    void router.push(NOT_AUTH_REDIRECT);
  };
};
