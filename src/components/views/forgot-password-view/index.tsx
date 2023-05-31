import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link } from '~/components/common/next-link';
import { type FormValues, ForgotPasswordForm } from '~/components/views/forgot-password-view/forgot-password-form';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';

export function ForgotPasswordView() {
  const submitHandler = (data: FormValues) => {
    console.debug('data', data);
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
        Забули пароль
      </Typography>

      <ForgotPasswordForm isLoading={false} onSubmit={submitHandler} />

      <Grid
        container
        sx={({ palette }) => ({
          borderTopColor: palette.divider,
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          pt: 2,
          mt: 4,
        })}
      >
        <Grid item xs>
          <Link href={RoutePaths.SIGN_IN} id={UiILocators.FORGOT_PASSWORD_FORM_BACK_LINK}>
            Повернутись до входу
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
