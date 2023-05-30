import { type Components, type Theme } from '@mui/material';

export const muiAppBarOverride: Partial<Components<Theme>> = {
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme: { spacing, palette } }) => ({
        backgroundImage: 'none',
        backgroundColor: palette.background.default,
        alignItems: 'center',
        padding: spacing(0, 1),
      }),
    },
  },
};
