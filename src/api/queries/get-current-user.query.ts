import { type QueryFn } from '~/react-query/react-query.types';
import { useFetch } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';

export type UserRes = {
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  id: number;
};

export const useGetCurrentUser: QueryFn<UserRes | null> = () => {
  const { token } = authService();
  const { isLoading, isSuccess, isError, error, data } = useFetch<UserRes>({
    url: token ? '/users/profile/' : null,
  });

  return { isLoading, isSuccess, isError, error, data: data ?? null };
};
