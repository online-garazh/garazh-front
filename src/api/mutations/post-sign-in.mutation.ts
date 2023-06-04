import { usePost } from '~/react-query/react-query.utils';

export type SignInReq = { email: string; password: string };
export type SignInRes = { access_token: string };

export const usePostSignIn = () => {
  const { mutate, isLoading } = usePost<SignInReq, SignInRes>('/auth/login/');

  return { mutate, isLoading };
};
