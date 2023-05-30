import { type Components, type Theme } from '@mui/material';

export const muiTypographyOverride: Partial<Components<Theme>> = {
  MuiTypography: {
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
