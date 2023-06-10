import { usePost } from '~/react-query/react-query.utils';

export type CheckNickNameReq = {
  nickName: string;
};
export type CheckNickNameRes = {
  isExisting: boolean;
};

type Props = {
  onSuccess?: (data: CheckNickNameRes) => void;
  onError?: (data: CheckNickNameRes) => void;
};

export const usePostCheckNickName = (props: Props) => {
  const { onError, onSuccess } = props;
  const { mutate, isLoading } = usePost<CheckNickNameReq, CheckNickNameRes>({
    url: '/users/verifyNicknameAvailability/',
    options: {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data);
      },
      onError: () => {
        if (onError)
          onError({
            isExisting: true,
          });
      },
    },
  });

  return { mutate, isLoading };
};
