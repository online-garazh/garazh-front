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
      input: ({ theme: { spacing, palette } }) => ({
        lineHeight: 1.5,
        height: '1.6em',
        padding: spacing(1.5, 2),
        '&::placeholder': {
          fontSize: '15px',
          color: '#909eab',
          opacity: 0.9,
        },
        ':-webkit-autofill': {
          WebkitBoxShadow: palette.mode.includes('dark') ? '0 0 0 1000px #1D1F24 inset' : '0 0 0 1000px white inset',
        },
      }),
      notchedOutline: ({ theme: { palette } }) => ({
        borderColor: palette.mode === 'dark' ? palette.background.paper : palette.divider,
      }),
    },
  },
};
