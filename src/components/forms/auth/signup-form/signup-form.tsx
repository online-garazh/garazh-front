import { signupValidationForm } from '@/constants/validations/validation.forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface SignupFormProps {
  onSubmitForm: any;
  loading: boolean;
}

export function SignupForm({ onSubmitForm, loading }: SignupFormProps) {
  const {
    handleSubmit,
    getValues,
    register,
    setError,
    control,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    resolver: zodResolver(signupValidationForm()),
    mode: 'all',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const values = getValues();

  console.log('values', errors);
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();

        handleSubmit(onSubmitForm)(e);
      }}
    >
      <FormControl>
        <Grid container alignContent="flex-start" spacing={0}>
          <Grid
            sx={{ marginBottom: '50px' }}
            container
            alignContent="flex-start"
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: 'bold', marginBottom: '16px' }}
            >
              Створіть свій онлайн гараж
            </Typography>

            <Typography variant="body2" align="center">
              Вже є аккаунт?
              <Typography
                variant="body2"
                color="custom.main"
                align="center"
                component="span"
                sx={{ cursor: 'pointer', marginLeft: '4px' }}
              >
                Увійти
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => {
                return (
                  <TextField
                    helperText={errors.nickname?.message}
                    sx={{ marginBottom: '24px' }}
                    error={!!errors.nickname}
                    id="outlined-basic"
                    variant="outlined"
                    label="Нікнейм*"
                    fullWidth
                    {...field}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <TextField
                    helperText={errors.email?.message}
                    sx={{ marginBottom: '24px' }}
                    label="Адреса електронної пошти*"
                    id="outlined-basic2"
                    variant="outlined"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    {...field}
                  />
                );
              }}
            />

            <FormControl
              sx={{ marginBottom: '28px' }}
              fullWidth
              variant="outlined"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!!errors.password}
              >
                Пароль*
              </InputLabel>

              <Controller
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <>
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={!!errors.password}
                        label="Password"
                        {...field}
                      />

                      {!!errors.password && (
                        <FormHelperText error id="password-error">
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </>
                  );
                }}
              />
            </FormControl>

            <LoadingButton
              variant="contained"
              loading={loading}
              color="primary"
              type="submit"
              size="large"
              fullWidth
            >
              Створити гараж
            </LoadingButton>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}
