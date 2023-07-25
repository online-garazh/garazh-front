import { useNotification } from '~/hooks/use-notification.hook';
import { usePost } from '~/react-query/react-query.utils';

export type ForgotPasswordReq = {
  email: string;
};
export type ForgotPasswordRes = {
  email: string;
};

export const usePostForgotPassword = () => {
  const { addSuccessMessage, addErrorMessage } = useNotification();
  const { mutate, isLoading } = usePost<ForgotPasswordReq, ForgotPasswordRes>({
    url: '/auth/forgot-password/',
    options: {
      onSuccess: () => {
        addSuccessMessage('Посилання для зміни паролю відправленно на вашу електронну адресу');
      },
      onError: (error) => {
        if (error.status === 400 && error.message === 'No user found')
          addErrorMessage('Користувача з такою електронною адресою не знайдено');
      },
    },
  });

  return { mutate, isLoading };
};
