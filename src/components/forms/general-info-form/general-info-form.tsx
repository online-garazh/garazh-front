import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextField } from '~/components/common/text-field';
import { UploadAvatarUi } from '~/components/common/ui/avatar-ui/avatar-ui';
import { InputPhone } from '~/components/common/ui/number-input/number-input';
import { Uploader } from '~/components/common/uploader/uploader';
import { UiILocators } from '~/constants/ui-locators.constant';
import { type CountryType } from '~/types/app.type';

export type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  city: string;
};

const ACCEPTED_IMAGE_FORMATS = {
  'image/svg': ['.svg'],
  'image/png': ['.png'],
};

type Props = {
  isLoading?: boolean;
  onSubmit: (values: FormValues) => void;
  countries: CountryType[];
};

export const generalInfoFormSchema = () =>
  z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
  });

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '8px',
  color: theme.palette.text.secondary,
  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
}));

export function GeneralInfoForm(props: Props) {
  const { onSubmit, countries } = props;
  const { handleSubmit, control } = useForm<FormValues>({
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    resolver: zodResolver(generalInfoFormSchema()),
    mode: 'onSubmit',
  });
  const onChangeFile = () => {
    // eslint-disable-next-line no-console
    // console.log('22');
  };

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
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Item>
              <Uploader
                render={({ open }) => (
                  <>
                    <Box
                      component="button"
                      sx={{ outline: 'none', marginBottom: 2, border: 'none', backgroundColor: 'transparent' }}
                      onClick={(e) => {
                        e.preventDefault();

                        open();
                      }}
                    >
                      <UploadAvatarUi />
                    </Box>

                    <Typography component="p" variant="caption">
                      Дозволено *.jpg, *.png,
                    </Typography>
                  </>
                )}
                accept={ACCEPTED_IMAGE_FORMATS}
                onChangeFile={onChangeFile}
                // maxSize={MAX_IMAGE_FILE}
                errorSizeText="Error text"
              />
            </Item>
          </Grid>

          <Grid item xs={6} md={9}>
            <Item sx={{ textAlign: 'left' }}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={6} sx={{ paddingTop: 0 }}>
                  <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        errorMessage={fieldState.error?.message}
                        InputProps={{
                          placeholder: 'Введіть ваше ім’я',
                        }}
                        fullWidth
                        required
                        label="Ім’я"
                        noHelper
                        error={fieldState.invalid}
                        type="text"
                        id={UiILocators.GENERAL_INFO_FORM_FIRST_NAME}
                      />
                    )}
                    name="firstName"
                  />
                </Grid>

                <Grid item xs={6} md={6} sx={{ paddingTop: 0 }}>
                  <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        errorMessage={fieldState.error?.message}
                        InputProps={{
                          placeholder: 'Введіть ваше прізвище',
                        }}
                        fullWidth
                        required
                        label="Ваше прізвище"
                        error={fieldState.invalid}
                        type="text"
                        id={UiILocators.GENERAL_INFO_FORM_LAST_NAME}
                      />
                    )}
                    name="lastName"
                  />
                </Grid>

                <Grid item xs={6} md={6} sx={{ paddingTop: '0 !important' }}>
                  <Controller control={control} render={() => <InputPhone />} name="phoneNumber" />
                </Grid>

                <Grid item xs={6} md={6} sx={{ paddingTop: '0 !important' }}>
                  <Typography component="p" variant="body2" sx={{ marginBottom: '4px' }}>
                    Країна
                  </Typography>

                  <Select
                    sx={{ width: '100%' }}
                    placeholder="Виберіть країну"
                    // label="Age"
                    value="ukraine"
                    // onChange={handleChange}
                    displayEmpty
                    renderValue={(selected: string) => {
                      if (!selected) return <Typography component="p">Виберіть країну</Typography>;

                      return <> {selected} </>;
                    }}
                    inputProps={{ width: '100%', 'aria-label': 'Without label' }}
                  >
                    {countries.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={6} md={6} sx={{ paddingTop: '0 !important' }}>
                  <Typography component="p" variant="body2" sx={{ marginBottom: '4px' }}>
                    Місто
                  </Typography>

                  <Select
                    sx={{ width: '100%' }}
                    placeholder="Виберіть місто"
                    // label="Age"
                    // value={age}
                    // onChange={handleChange}
                    displayEmpty
                    renderValue={(selected: string) => {
                      if (!selected)
                        return (
                          <Typography
                            component="p"
                            variant="body2"
                            sx={{ fontSize: '15px', color: '#909eab', opacity: 0.9 }}
                          >
                            Виберіть місто
                          </Typography>
                        );

                      return selected;
                    }}
                    inputProps={{ width: '100%', 'aria-label': 'Without label' }}
                  >
                    {countries.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
