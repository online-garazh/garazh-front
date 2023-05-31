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
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
};

export const newPasswordFormSchema = () =>
  z
    .object({
      confirmPassword: fieldsSchemas.password(),
      password: fieldsSchemas.password(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ResolverErrors.passwordsMatchField,
      path: ['confirmPassword'],
    });

export function NewPasswordForm(props: Props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, control } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(newPasswordFormSchema()),
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
          <BoolRenderProp
            render={({ toggleBool, boolValue }) => (
              <TextField
                {...field}
                alwaysShowAdornment
                errorMessage={fieldState.error?.message}
                InputProps={{
                  placeholder: 'Введіть новий пароль тут',
                }}
                fullWidth
                required
                suffix={
                  <PasswordIcon
                    toggleBool={toggleBool}
                    boolValue={boolValue}
                    id={UiILocators.NEW_PASSWORD_FORM_NEW_PASSWORD_ICON}
                  />
                }
                label="Пароль"
                error={fieldState.invalid}
                type={boolValue ? 'text' : 'password'}
                id={UiILocators.NEW_PASSWORD_FORM_NEW_PASSWORD}
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
                    id={UiILocators.NEW_PASSWORD_FORM_CONFIRM_PASSWORD_ICON}
                  />
                }
                label="Підтвердження пароля"
                error={fieldState.invalid}
                type={boolValue ? 'text' : 'new-password'}
                id={UiILocators.NEW_PASSWORD_FORM_CONFIRM_PASSWORD}
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
        id={UiILocators.NEW_PASSWORD_FORM_SUBMIT}
      >
        Підтвердити
      </Button>
    </Box>
  );
}
