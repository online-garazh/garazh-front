import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

import { usePostSignUp } from '~/api/mutations/post-sign-up.mutation';
import { Link } from '~/components/common/next-link';
import { type FormValues } from '~/components/views/sign-up-view/sign-up-form';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';

const SignUpForm = dynamic(() => import('../sign-up-view/sign-up-form').then((mod) => mod.SignUpForm));

export function SignUpView() {
  const { mutate: signUpMutate, isLoading } = usePostSignUp();
  const submitHandler = (data: FormValues) => {
    signUpMutate(data);
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
        Зареєструватись
      </Typography>

      <SignUpForm isLoading={isLoading} onSubmit={submitHandler} />

      <Grid
        justifyContent="center"
        container
        sx={({ palette }) => ({
          borderTopColor: palette.divider,
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          pt: 1.5,
          mt: 3.75,
        })}
      >
        <Grid item>
          <Link href={RoutePaths.SIGN_IN} id={UiILocators.SIGN_UP_FORM_BACK_LINK}>
            Вже є аккаунт? Увійти
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
