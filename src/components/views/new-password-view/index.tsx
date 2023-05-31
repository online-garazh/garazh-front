import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { type FormValues, NewPasswordForm } from '~/components/views/new-password-view/new-password-form';

export function NewPasswordView() {
  const submitHandler = (data: FormValues) => {
    console.debug(data);
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        mt: 8,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
        Змінити пароль
      </Typography>

      <NewPasswordForm isLoading={false} onSubmit={submitHandler} />
    </Box>
  );
}
