import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, type Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

import { usePostCheckNickName } from '~/api/mutations/post-check-nick-name.mutation';
import { BoolRenderProp } from '~/components/common/bool-render-prop';
import { Button } from '~/components/common/button';
import { PasswordIcon } from '~/components/common/icons/password-icon';
import { TextField } from '~/components/common/text-field';
import { ResolverErrors } from '~/constants/errors.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { nameOf } from '~/utils/name-of.util';
import { fieldsSchemas } from '~/validations/fields.schemas';

export type FormValues = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  nickName: string;
  email: string;
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
};

export const signUpFormSchema = () =>
  z
    .object({
      confirmPassword: fieldsSchemas.password(),
      firstName: fieldsSchemas.firstName(),
      lastName: fieldsSchemas.lastName(),
      nickName: fieldsSchemas.nickName(),
      password: fieldsSchemas.password(),
      email: fieldsSchemas.email(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ResolverErrors.passwordsMatchField,
      path: [nameOf<FormValues>('confirmPassword')],
    });

export function SignUpForm(props: Props) {
  const { onSubmit, isLoading } = props;
  const isXS = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
  const { handleSubmit, control, watch, setError } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      confirmPassword: '',
      firstName: '',
      lastName: '',
      password: '',
      nickName: '',
      email: '',
    },
    resolver: zodResolver(signUpFormSchema()),
    mode: 'onSubmit',
  });
  const nickName = watch('nickName');
  const { mutate: checkNickNameMutate } = usePostCheckNickName({
    onSuccess: ({ isExisting }) => {
      if (isExisting) setError('nickName', { message: 'Такій нікнейм вже існує' });
    },
    onError: ({ isExisting }) => {
      if (isExisting) setError('nickName', { message: 'Такій нікнейм вже існує' });
    },
  });
  const debouncedCheck = useDebouncedCallback((nickName) => {
    checkNickNameMutate({ nickName });
  }, 1000);

  useEffect(() => {
    if (nickName) debouncedCheck(nickName);
  }, [debouncedCheck, nickName]);

  return (
    <Box
      noValidate
      component="form"
      onSubmit={(e) => {
        e.stopPropagation();

        e.preventDefault();

        void handleSubmit(onSubmit)(e);
      }}
      sx={{ width: '100%' }}
    >
      <Grid container spacing={isXS ? 0 : 2}>
        <Grid item xs={12} sm={5}>
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                InputProps={{
                  placeholder: "Введіть свое ім'я",
                }}
                fullWidth
                required
                label="Ім'я"
                error={fieldState.invalid}
                type="email"
                id={UiILocators.SIGN_UP_FORM_FIRST_NAME}
              />
            )}
            name="firstName"
          />
        </Grid>

        <Grid item xs={12} sm={7}>
          <Controller
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                InputProps={{
                  placeholder: 'Введіть своє прізвище',
                }}
                fullWidth
                required
                label="Прізвище"
                error={fieldState.invalid}
                type="email"
                id={UiILocators.SIGN_UP_FORM_LAST_NAME}
              />
            )}
            name="lastName"
          />
        </Grid>
      </Grid>

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            errorMessage={fieldState.error?.message}
            InputProps={{
              placeholder: 'Введіть свій нікнейм',
            }}
            fullWidth
            required
            label="Нікнейм"
            error={fieldState.invalid}
            type="email"
            id={UiILocators.SIGN_UP_FORM_NICK_NAME}
          />
        )}
        name="nickName"
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            errorMessage={fieldState.error?.message}
            InputProps={{
              placeholder: 'Введіть свою електронну пошту',
            }}
            fullWidth
            required
            label="Електронна пошта"
            error={fieldState.invalid}
            type="email"
            id={UiILocators.SIGN_UP_FORM_EMAIL}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <BoolRenderProp
            render={({ toggleBool, boolValue }) => (
              <TextField
                {...field}
                alwaysShowAdornment
                errorMessage={fieldState.error?.message}
                InputProps={{
                  placeholder: 'Введіть свій пароль',
                }}
                fullWidth
                required
                suffix={
                  <PasswordIcon
                    toggleBool={toggleBool}
                    boolValue={boolValue}
                    id={UiILocators.SIGN_UP_FORM_PASSWORD_ICON}
                  />
                }
                label="Пароль"
                error={fieldState.invalid}
                type={boolValue ? 'text' : 'password'}
                id={UiILocators.SIGN_UP_FORM_PASSWORD}
              />
            )}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <BoolRenderProp
            render={({ toggleBool, boolValue }) => (
              <TextField
                {...field}
                alwaysShowAdornment
                errorMessage={fieldState.error?.message}
                InputProps={{
                  placeholder: 'Введіть підтвердження паролю',
                }}
                fullWidth
                required
                suffix={
                  <PasswordIcon
                    toggleBool={toggleBool}
                    boolValue={boolValue}
                    id={UiILocators.SIGN_UP_FORM_CONFIRM_PASSWORD_ICON}
                  />
                }
                label="Підтвердження пароля"
                error={fieldState.invalid}
                type={boolValue ? 'text' : 'password'}
                id={UiILocators.SIGN_UP_FORM_CONFIRM_PASSWORD}
              />
            )}
          />
        )}
        name="confirmPassword"
      />

      <Button
        fullWidth
        isLoading={isLoading}
        variant="contained"
        color="secondary"
        type="submit"
        size="large"
        id={UiILocators.SIGN_UP_FORM_SUBMIT}
      >
        Створити аккаунт
      </Button>
    </Box>
  );
}
