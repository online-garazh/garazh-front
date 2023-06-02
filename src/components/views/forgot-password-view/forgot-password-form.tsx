import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/common/button';
import { TextField } from '~/components/common/text-field';
import { UiILocators } from '~/constants/ui-locators.constant';
import { fieldsSchemas } from '~/validations/fields.schemas';

export type FormValues = {
  email: string;
};

type Props = {
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
};

export const forgotPasswordFormSchema = () =>
  z.object({
    email: fieldsSchemas.email(),
  });

export function ForgotPasswordForm(props: Props) {
  const { onSubmit, isLoading } = props;
  const { handleSubmit, control } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordFormSchema()),
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
            id={UiILocators.FORGOT_PASSWORD_FORM_EMAIL}
          />
        )}
        name="email"
      />

      <Button
        fullWidth
        isLoading={isLoading}
        variant="contained"
        color="secondary"
        type="submit"
        size="large"
        id={UiILocators.FORGOT_PASSWORD_FORM_SUBMIT}
      >
        Надіслати
      </Button>
    </Box>
  );
}
