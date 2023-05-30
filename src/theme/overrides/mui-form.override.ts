import { type Components, type Theme } from '@mui/material';

export const muiFormOverride: Partial<Components<Theme>> = {
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme: { palette, spacing } }) => ({
        '&.MuiInputLabel-root': {
          marginBottom: spacing(0.25),
          lineHeight: '1.125rem',
          color: palette.text.secondary,
        },
      }),
    },
  },
};
