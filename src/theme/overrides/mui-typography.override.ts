import { type Components, type Theme } from '@mui/material';

export const muiTypographyOverride: Partial<Components<Theme>> = {
  MuiTypography: {
    // styleOverrides: {
    //   root: {
    //     color: '#212b36',
    //   },
    // },

    defaultProps: {
      variantMapping: {
        // Map the new variant to render a <tag> by default
        body1_medium: 'p',
        body2_medium: 'p',
        body3: 'p',
      },
    },
  },
};
