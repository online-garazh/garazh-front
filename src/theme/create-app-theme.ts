import { type PaletteMode, type Shadows } from '@mui/material';
import { createTheme, responsiveFontSizes, type Theme, type ThemeOptions } from '@mui/material/styles';
import { type CSSProperties } from 'react';

import { appPalette } from '~/theme/app-palette';
import { defaultTheme } from '~/theme/default-theme';
import {
  muiAppBarOverride,
  muiButtonOverride,
  muiCssBaseLineOverride,
  muiInputOverride,
  muiTypographyOverride,
  muiFormOverride,
} from '~/theme/overrides';

export const createAppTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme(defaultTheme, {
    palette: {
      ...appPalette[mode],
      mode,
    },
  });
  const { breakpoints, palette } = theme;

  theme = responsiveFontSizes(theme);

  theme = createTheme(theme, {
    typography: {
      fontFamily: 'inherit',
      button: {
        textTransform: 'none',
      },
      h1: {
        fontFamily: 'Rubik',
      },
      h2: {
        color: palette.text.primary,
      },
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {
        fontFamily: 'Rubik',
        fontSize: '1rem',
        [breakpoints.down('md')]: {},
      },
      body1_medium: {},
      body2: {},
      body2_medium: {},
      body3: {},
      caption: {
        lineHeight: 1.5,
        color: palette.text.secondary,
      },
    },
    shape: {
      borderRadius: 2, // one unit = 2px
    },
    shadows: Array(25).fill('none') as Shadows, // All shadows have initial removing
    components: {
      // All MUI components overrides put here
      ...muiCssBaseLineOverride,
      ...muiTypographyOverride,
      ...muiButtonOverride,
      ...muiAppBarOverride,
      ...muiInputOverride,
      ...muiFormOverride,
    },
  } as ThemeOptions);

  return theme;
};

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    secondary: string;
    primary: string;
  }

  interface TypeText {
    tertiary: string;
    hint: string;
  }

  interface TypographyVariants {
    body1_medium: CSSProperties;
    body2_medium: CSSProperties;
    body3: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body1_medium?: CSSProperties;
    body2_medium?: CSSProperties;
    body3?: CSSProperties;
  }
}
// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1_medium: true;
    body2_medium: true;
    body3: true;
  }

  interface TypographyPropsColorOverrides {
    tertiary: true;
    hint: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    tertiary: true;
  }
}
