import { SignupForm } from '@/components/forms/auth/signup-form/signup-form';
import { Images } from '@/constants/images';
import { usePostMutation } from '@/utils/api';
import { authToken } from '@/utils/authToken';
import { SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

export interface SignUpViewProps {}

type User = {
  email: string;
  password: string;
};

export function SignUpView(props: SignUpViewProps) {
  const { setAuthToken, removeAuthToken } = authToken();

  const router = useRouter();
  const { mutate: loginMutate, isLoading: signInLoading } = usePostMutation<
    {
      access_token: string;
    },
    { email: string; password: string }
  >('/auth/login/', {
    onSuccess: (data) => {
      removeAuthToken();
      setAuthToken(data.access_token);

      router.push('/home');
    },
    onError: (error) => {
      console.log('onError', error);
    },
  });

  const { mutate: signUpMutate, isLoading: signUpLoading } = usePostMutation<
    User,
    User
  >('/auth/signup/', {
    onSuccess: (data, variables) => {
      loginMutate({ email: variables.email, password: variables.password });
    },
    onError: (error) => {
      console.log('onError', error);
    },
  });

  const onSubmit = (data: any) => {
    signUpMutate(data);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          justifyContent: 'center',
          marginBottom: '30px',
          display: 'flex',
          position: 'relative',
          top: '-40px',
        }}
      >
        <SvgIcon
          component={Images.logo}
          sx={{ width: '100px', height: '100px' }}
          inheritViewBox
        />
      </Box>

      <SignupForm
        loading={signUpLoading || signInLoading}
        onSubmitForm={onSubmit}
      />
    </Container>
  );
}
