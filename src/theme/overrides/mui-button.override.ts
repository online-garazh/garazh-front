import { type Components, type Theme } from '@mui/material';

export const muiButtonOverride: Partial<Components<Theme>> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {},
    },
  },
  MuiButton: {
    defaultProps: {
      disableTouchRipple: true,
      disableFocusRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme: { spacing, shape } }) => ({
        textTransform: 'initial',
        borderRadius: shape.borderRadius * 3,
        padding: spacing(0.5, 1),
      }),

      sizeSmall: ({ theme: { spacing } }) => ({
        height: spacing(3.5),
      }),

      sizeMedium: ({ theme: { spacing } }) => ({
        height: spacing(4.5),
      }),

      sizeLarge: ({ theme: { spacing } }) => ({
        height: spacing(5.5),
      }),
    },
  },
};
