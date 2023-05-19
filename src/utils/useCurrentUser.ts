import { useApiQuery } from '@/utils/api';

export const useCurrentUser = () => {
  const { data } = useApiQuery(['getUser'], '/users/profile/');

  return { currentUser: data };
};
