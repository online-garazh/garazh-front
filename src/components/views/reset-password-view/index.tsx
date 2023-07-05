import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

import { usePostResetPassword } from '~/api/mutations/post-reset-password.mutation';
import { type FormValues } from '~/components/views/reset-password-view/reset-password-form';

const ResetPasswordForm = dynamic(() =>
  import('~/components/views/reset-password-view/reset-password-form').then((mod) => mod.ResetPasswordForm)
);

export function ResetPasswordView() {
  const { mutate: resetPasswordMutate, isLoading } = usePostResetPassword();
  const submitHandler = (data: FormValues) => {
    resetPasswordMutate({
      resetToken: '',
      password: data.password,
    });
  };

  return (
    <Box
      sx={({ breakpoints }) => ({
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        mt: 8,
        [breakpoints.down('sm')]: {
          mt: 4,
        },
      })}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={({ breakpoints }) => ({
          textAlign: 'center',
          mb: 5,
          [breakpoints.down('sm')]: {
            mb: 4,
          },
        })}
      >
        Змінити пароль
      </Typography>

      <ResetPasswordForm isLoading={isLoading} onSubmit={submitHandler} />
    </Box>
  );
}
