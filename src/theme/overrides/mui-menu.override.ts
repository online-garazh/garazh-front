import { type Components, type Theme } from '@mui/material';

export const muiMenuOverride: Partial<Components<Theme>> = {
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme: { palette } }) => ({
        backgroundColor: palette.background.default,
        borderRadius: 4,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.32)',
      }),
    },
  },
};
