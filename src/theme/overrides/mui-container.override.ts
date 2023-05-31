import { type Components, type Theme } from '@mui/material';

export const muiContainerOverride: Partial<Components<Theme>> = {
  MuiContainer: {
    styleOverrides: {
      maxWidthXs: ({ theme: { breakpoints } }) => ({
        [breakpoints.up('xs')]: {
          maxWidth: 460,
        },
      }),
    },
  },
};
