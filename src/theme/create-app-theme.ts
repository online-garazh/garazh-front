import { type PaletteMode, type Shadows } from '@mui/material';
import { createTheme, responsiveFontSizes, type Theme, type ThemeOptions } from '@mui/material/styles';
import { type CSSProperties } from 'react';

import { rubik } from '~/pages/_app';
import { appPalette } from '~/theme/app-palette';
import { defaultTheme } from '~/theme/default-theme';
import {
  muiAppBarOverride,
  muiButtonOverride,
  muiCssBaseLineOverride,
  muiInputOverride,
  muiTypographyOverride,
  muiFormOverride,
  muiContainerOverride,
  muiMenuOverride,
} from '~/theme/overrides';

export const createAppTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme(defaultTheme, {
    palette: {
      ...appPalette[mode],
      mode,
    },
  });
  const { palette } = theme;

  theme = responsiveFontSizes(theme);

  theme = createTheme(theme, {
    typography: {
      fontFamily: rubik.style.fontFamily,
      button: {
        fontFamily: 'inherit',
        textTransform: 'none',
      },
      h1: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
      },
      h2: {
        fontFamily: rubik.style.fontFamily,
        color: palette.text.primary,
        fontWeight: 500,
      },
      h3: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
      },
      h4: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
      },
      h5: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
      },
      h6: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
      },
      subtitle1: {
        fontFamily: rubik.style.fontFamily,
      },
      subtitle2: {
        fontFamily: rubik.style.fontFamily,
      },
      body1: {
        fontFamily: rubik.style.fontFamily,
        fontSize: '1rem',
      },
      body1_medium: {
        fontFamily: rubik.style.fontFamily,
        fontWeight: 500,
        fontSize: '1rem',
      },
      body2: {
        fontFamily: rubik.style.fontFamily,
      },
      body2_medium: {
        fontFamily: rubik.style.fontFamily,
      },
      body3: {
        fontFamily: rubik.style.fontFamily,
      },
      caption: {
        fontFamily: rubik.style.fontFamily,
        lineHeight: 1.5,
        fontWeight: 300,
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
      ...muiContainerOverride,
      ...muiButtonOverride,
      ...muiAppBarOverride,
      ...muiInputOverride,
      ...muiFormOverride,
      ...muiMenuOverride,
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
