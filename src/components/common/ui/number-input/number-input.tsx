import Typography from '@mui/material/Typography';
import { MuiTelInput } from 'mui-tel-input';
import React from 'react';

export const InputPhone = () => {
  const [value, setValue] = React.useState('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography component="p" variant="body2" sx={{ marginBottom: '4px' }}>
        Телефон
      </Typography>

      <MuiTelInput
        sx={{
          width: '100%',
          input: {
            paddingLeft: 0,
          },
          marginBottom: '24px',
        }}
        placeholder="Введіть ваш телефон"
        value={value}
        defaultCountry="UA"
        onChange={handleChange}
      />
    </>
  );
};
