import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { BoolRenderProp } from '~/components/common/bool-render-prop';
import { Button } from '~/components/common/button';
import { PasswordIcon } from '~/components/common/icons/password-icon';
import { TextField } from '~/components/common/text-field';
import { UiILocators } from '~/constants/ui-locators.constant';
import { fieldsSchemas } from '~/validations/fields.schemas';

export type FormValues = {
  password: string;
  email: string;
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
};

export const signInFormSchema = () =>
  z.object({
    password: fieldsSchemas.password(),
    email: fieldsSchemas.email(),
  });

export function SignInForm(props: Props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, control } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      password: 'Frontend09',
      email: 'skoval+1@s-pro.io',
    },
    resolver: zodResolver(signInFormSchema()),
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
              placeholder: 'Введіть свою електронну пошту',
            }}
            fullWidth
            required
            label="Електронна пошта"
            error={fieldState.invalid}
            type="email"
            id={UiILocators.SIGN_IN_FORM_EMAIL}
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
                    id={UiILocators.SIGN_IN_FORM_PASSWORD_ICON}
                  />
                }
                label="Пароль"
                error={fieldState.invalid}
                type={boolValue ? 'text' : 'password'}
                id={UiILocators.SIGN_IN_FORM_PASSWORD}
              />
            )}
          />
        )}
        name="password"
      />

      <Button
        fullWidth
        isLoading={isLoading}
        variant="contained"
        color="secondary"
        type="submit"
        size="large"
        id={UiILocators.SIGN_IN_FORM_SUBMIT}
      >
        Увійти
      </Button>
    </Box>
  );
}
