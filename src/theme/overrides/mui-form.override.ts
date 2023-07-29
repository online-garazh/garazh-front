import { type Components, type Theme } from '@mui/material';

export const muiFormOverride: Partial<Components<Theme>> = {
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme: { palette, spacing } }) => ({
        '&.MuiInputLabel-root': {
          marginBottom: spacing(0.8),
          lineHeight: '1.125rem',
          fontWeight: 400,
          color: palette.text.secondary,
        },
      }),
    },
  },

  // MuiFormControl: {
  //   styleOverrides: {
  //     root: ({ theme: { palette, spacing } }) => ({
  //       // marginBottom: '24px !important',
  //       marginNormal: 'normal',
  //       '&.MuiFormControl-root': {
  //         marginBottom: '24px',
  //       },
  //     }),
  //   },
  // },
};
