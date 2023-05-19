import { Images } from '@/constants/images';
import { usePostMutation } from '@/utils/api';
import { authToken } from '@/utils/authToken';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SvgIcon,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface LoginViewProps {}

export function LoginView(props: LoginViewProps) {
  const router = useRouter();
  const { setAuthToken, removeAuthToken } = authToken();

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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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

      <Grid container alignContent="flex-start" spacing={0}>
        <Grid sx={{ marginBottom: '50px' }} container alignContent="flex-start">
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 'bold', marginBottom: '16px' }}
          >
            Увійдіть у онлайн гараж
          </Typography>

          <Typography variant="body2" align="center">
            Новий користувач?
            <Typography
              variant="body2"
              color="custom.main"
              align="center"
              component="span"
              sx={{ cursor: 'pointer', marginLeft: '4px' }}
            >
              Створити аккаунт
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ marginBottom: '32px' }}
            label="Адреса електронної пошти"
            id="outlined-basic"
            variant="outlined"
            fullWidth
          />

          <FormControl
            sx={{ marginBottom: '16px' }}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>

            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Box sx={{ marginBottom: '16px' }}>
            <Typography
              variant="body2"
              align="right"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Забули пароль?
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              loginMutate({
                email: 'skoval+1@s-pro.io',
                password: 'Frontend09',
              })
            }
          >
            Увійти
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
