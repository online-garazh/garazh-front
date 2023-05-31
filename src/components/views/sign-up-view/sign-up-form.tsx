import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { BoolRenderProp } from '~/components/common/bool-render-prop';
import { Button } from '~/components/common/button';
import { PasswordIcon } from '~/components/common/icons/password-icon';
import { TextField } from '~/components/common/text-field';
import { ResolverErrors } from '~/constants/errors.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { fieldsSchemas } from '~/validations/fields.schemas';

export type FormValues = {
  confirmPassword: string;
  password: string;
  nickname: string;
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
      nickname: fieldsSchemas.nickname(),
      password: fieldsSchemas.password(),
      email: fieldsSchemas.email(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ResolverErrors.passwordsMatchField,
      path: ['confirmPassword'],
    });

export function SignUpForm(props: Props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, control } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      confirmPassword: '',
      password: '',
      nickname: '',
      email: '',
    },
    resolver: zodResolver(signUpFormSchema()),
    mode: 'onSubmit',
  });

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
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            errorMessage={fieldState.error?.message}
            InputProps={{
              placeholder: 'Введіть свій нікнейм тут',
            }}
            fullWidth
            required
            label="Нікнейм"
            error={fieldState.invalid}
            type="email"
            id={UiILocators.SIGN_UP_FORM_NICKNAME}
          />
        )}
        name="nickname"
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            errorMessage={fieldState.error?.message}
            InputProps={{
              placeholder: 'Введіть свою електронну пошту тут',
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
                  placeholder: 'Введіть свій пароль тут',
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
                  placeholder: 'Введіть підтвердження паролю тут',
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
                type={boolValue ? 'text' : 'new-password'}
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
