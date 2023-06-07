import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

import { type FormValues } from '~/components/views/new-password-view/new-password-form';

const NewPasswordForm = dynamic(() =>
  import('../new-password-view/new-password-form').then((mod) => mod.NewPasswordForm)
);

export function NewPasswordView() {
  const submitHandler = (data: FormValues) => {
    console.debug(data);
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

      <NewPasswordForm isLoading={false} onSubmit={submitHandler} />
    </Box>
  );
}
