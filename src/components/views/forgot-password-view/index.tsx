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
        Забули пароль?
      </Typography>

      <Typography
        variant="body1"
        sx={({ palette }) => ({ textAlign: 'center', mb: 3, fontSize: '0.875rem', color: palette.text.hint })}
      >
        Введіть адресу електронної пошти, пов’язану з вашим обліковим записом, і ми надішлемо вам електронною поштою
        посилання для зміни пароля.
      </Typography>

      <ForgotPasswordForm isLoading={false} onSubmit={submitHandler} />

      <Grid
        justifyContent="center"
        container
        sx={({ palette }) => ({
          borderTopColor: palette.divider,
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          pt: 2,
          mt: 4,
        })}
      >
        <Grid item>
          <Link href={RoutePaths.SIGN_IN} id={UiILocators.FORGOT_PASSWORD_FORM_BACK_LINK}>
            Повернутись до входу
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
