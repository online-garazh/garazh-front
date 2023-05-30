import { type Components, type Theme } from '@mui/material';

export const muiInputOverride: Partial<Components<Theme>> = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme: { palette, spacing, shape } }) => ({
        backgroundColor: palette.background.paper,
        borderRadius: shape.borderRadius * 3,
        borderColor: palette.background.paper,
        '&.MuiInputBase-adornedEnd': {
          paddingRight: spacing(1),
        },
      }),
      input: ({ theme: { spacing } }) => ({
        height: '1.5em',
        lineHeight: 1.5,
        padding: spacing(1.5, 2),
      }),
      notchedOutline: ({ theme: { palette } }) => ({
        borderColor: palette.background.paper,
      }),
    },
  },
};
