import { type Components, type Theme } from '@mui/material';

export const muiInputOverride: Partial<Components<Theme>> = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme: { palette, spacing, shape } }) => ({
        ...(palette.mode === 'dark' && {
          backgroundColor: palette.background.paper,
          borderColor: palette.background.paper,
        }),
        borderRadius: shape.borderRadius * 3,
        '&.MuiInputBase-adornedEnd': {
          paddingRight: spacing(1),
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.secondary.main,
          },
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.secondary.main,
          },
        },
      }),
      input: ({ theme: { spacing } }) => ({
        lineHeight: 1.5,
        height: '1.5em',
        padding: spacing(1.5, 2),
      }),
      notchedOutline: ({ theme: { palette } }) => ({
        borderColor: palette.mode === 'dark' ? palette.background.paper : palette.divider,
      }),
    },
  },
};
