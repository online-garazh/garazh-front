import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { Link } from '~/components/common/next-link';
import { type FormValues, SignUpForm } from '~/components/views/sign-up-view/sign-up-form';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { authService } from '~/services/auth.service';
import { usePostMutation } from '~/utils/api';

type User = FormValues;

export function SignUpView() {
  const { setAuthToken, removeAuthToken } = authService();
  const router = useRouter();
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
  const { mutate: signUpMutate, isLoading: signUpLoading } = usePostMutation<User, User>('/auth/signup/', {
    onSuccess: (_data, variables) => {
      signInMutate({ email: variables.email, password: variables.password });
    },
    onError: (error) => {
      console.debug('onError', error);
    },
  });
  const submitHandler = (data: FormValues) => {
    signUpMutate(data);
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
        Реєстрація
      </Typography>

      <SignUpForm isLoading={signUpLoading || signInLoading} onSubmit={submitHandler} />

      <Grid
        container
        justifyContent="center"
        sx={({ palette }) => ({
          borderTopColor: palette.divider,
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          pt: 2,
          mt: 4,
        })}
      >
        <Grid item xs>
          <Link href={RoutePaths.SIGN_IN} id={UiILocators.SIGN_UP_FORM_BACK_LINK}>
            Вже є аккаунт? Увійти
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
