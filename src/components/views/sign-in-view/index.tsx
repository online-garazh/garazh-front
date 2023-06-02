import { Grid, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { Link } from '~/components/common/next-link';
import { type FormValues, SignInForm } from '~/components/views/sign-in-view/sign-in-form';
import { icons } from '~/configs/icons.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { authService } from '~/services/auth.service';
import { usePostMutation } from '~/utils/api';

export function SignInView() {
  const { palette } = useTheme();
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

      void router.push(RoutePaths.FEED);
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
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          display: 'flex',
          height: 100,
          width: 100,
          mb: 4,
        }}
      >
        <SvgIcon
          color={palette.mode === 'dark' ? 'primary' : 'secondary'}
          inheritViewBox
          component={icons.svg.logo}
          sx={{
            height: 100,
            width: 100,
          }}
        />
      </Box>

      <Typography component="h1" variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
        Увійдіть
      </Typography>

      <SignInForm isLoading={signInLoading} onSubmit={submitHandler} />

      <Grid
        container
        sx={({ palette }) => ({
          borderTopColor: palette.divider,
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          pt: 1.5,
          mt: 3.75,
        })}
      >
        <Grid item xs>
          <Link href={RoutePaths.SIGN_UP} id={UiILocators.SIGN_IN_FORM_SIGN_UP_LINK}>
            Реєстрація
          </Link>
        </Grid>

        <Grid item>
          <Link href={RoutePaths.FORGOT_PASSWORD} id={UiILocators.SIGN_IN_FORM_FORGOT_LINK}>
            Забули пароль?
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
