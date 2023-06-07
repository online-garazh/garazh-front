import { type QueryFn } from '~/react-query/react-query.types';
import { useLazyQuery } from '~/react-query/react-query.utils';
import { authService } from '~/services/auth.service';

export type CurrentUserRes = {
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  id: number;
};

export const useGetCurrentUser: QueryFn<CurrentUserRes | null> = () => {
  const { token } = authService();
  const [trigger, query] = useLazyQuery<CurrentUserRes>({ url: '/users/profile/' });
  const { isLoading, isSuccess, isError, error, data } = query;

  if (token) trigger();

  return { isLoading, isSuccess, isError, error, data: data ?? null };
};
