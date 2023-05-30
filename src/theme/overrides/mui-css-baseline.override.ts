import { type Components, type Theme } from '@mui/material';

export const muiCssBaseLineOverride: Partial<Components<Theme>> = {
  MuiCssBaseline: {
    styleOverrides: ({ palette }) => ({
      body: {
        backgroundColor: palette.background.default,
      },
    }),
  },
};
