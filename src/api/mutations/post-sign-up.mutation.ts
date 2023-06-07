import { usePostSignIn } from '~/api/mutations/post-sign-in.mutation';
import { usePost } from '~/react-query/react-query.utils';

export type SignUpReq = {
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  email: string;
};
export type SignUpRes = {
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  id: number;
};

export const usePostSignUp = () => {
  const { mutate: signInMutate, isLoading: signInLoading } = usePostSignIn();
  const { mutate, isLoading: signUpLoading } = usePost<SignUpReq, SignUpRes>({
    url: '/auth/signup/',
    options: {
      onSuccess: (_data, variables) => {
        signInMutate({ email: variables.email, password: variables.password });
      },
      onError: (error) => {
        console.debug('onError', error);
      },
    },
  });

  return { mutate, isLoading: signUpLoading || signInLoading };
};
