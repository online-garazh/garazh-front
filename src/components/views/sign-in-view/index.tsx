import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { Link } from '~/components/common/next-link';
import { type FormValues, SignInForm } from '~/components/views/sign-in-view/sign-in-form';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { authService } from '~/services/auth.service';
import { usePostMutation } from '~/utils/api';

export function SignInView() {
  const router = useRouter();
  const { setAuthToken, removeAuthToken } = authService();
  const { mutate: signInMutate, isLoading: signInLoading } = usePostMutation<
    {
      access_token: string;
    },
    { email: string; password: string }
  >('/auth/login/', {
    onSuccess: (data) => {
      removeAuthToken();

      setAuthToken(data.access_token);

      void router.push(RoutePaths.HOME);
    },
    onError: (error) => {
      console.debug('onError', error);
    },
  });
  const submitHandler = (_data: FormValues) => {
    signInMutate({
      password: 'Frontend09',
      email: 'skoval+1@s-pro.io',
    });
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
      <Typography component="h1" variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
        Увійдіть
      </Typography>

      <SignInForm isLoading={signInLoading} onSubmit={submitHandler} />

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
          <Link href={RoutePaths.SIGN_UP} id={UiILocators.SIGN_IN_FORM_SIGN_UP_LINK} color="secondary">
            Реєстрація
          </Link>
        </Grid>

        <Grid item>
          <Link href={RoutePaths.FORGOT_PASSWORD} id={UiILocators.SIGN_IN_FORM_FORGOT_LINK} color="secondary">
            Забули пароль?
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
