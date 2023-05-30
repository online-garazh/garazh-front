import { type Palette } from '@mui/material';

import { Colors } from '~/theme/colors';

export const appPalette = {
  // ---------- Light mode ----------
  light: {
    primary: {
      contrastText: Colors.white,
      light: Colors.primary300,
      main: Colors.primary500,
      dark: Colors.primary700,
    },
    secondary: {
      contrastText: Colors.white,
      light: Colors.secondary500,
      main: Colors.secondary700,
      dark: Colors.secondary800,
    },
    tertiary: {
      contrastText: Colors.white,
      light: Colors.tertiary500,
      main: Colors.tertiary700,
      dark: Colors.tertiary900,
    },
    warning: {
      contrastText: Colors.white,
      light: Colors.warning300,
      main: Colors.warning500,
      dark: Colors.warning700,
    },
    success: {
      contrastText: Colors.white,
      light: Colors.success500,
      main: Colors.success700,
      dark: Colors.success800,
    },
    error: {
      contrastText: Colors.white,
      light: Colors.error300,
      main: Colors.error500,
      dark: Colors.error700,
    },
    background: {
      secondary: Colors.white,
      primary: Colors.white,
      default: Colors.white,
      paper: '#FCFCFC',
    },
    info: {
      contrastText: Colors.white,
      light: Colors.smoke400,
      main: Colors.smoke800,
      dark: Colors.smoke900,
    },
    text: {
      secondary: '#333333',
      disabled: Colors.secondary200,
      primary: '#1F1F1F',
    },
    divider: Colors.secondary200,
    common: {
      black: Colors.black,
      white: Colors.white,
    },
  } as Palette,
  // ---------- Dark mode ----------
  dark: {
    primary: {
      contrastText: Colors.black,
      light: '#FFFFFF',
      main: '#FAFAFA',
      dark: '#F1F1F1',
    },
    secondary: {
      contrastText: Colors.white,
      light: '#33BC77',
      main: '#00AB55',
      dark: '#008944',
    },
    tertiary: {
      contrastText: Colors.white,
      light: '#959BAB',
      main: '#7A8296',
      dark: '#626878',
    },
    warning: {
      contrastText: Colors.white,
      light: Colors.warning300,
      main: Colors.warning500,
      dark: Colors.warning700,
    },
    success: {
      contrastText: Colors.white,
      light: Colors.success500,
      main: Colors.success700,
      dark: Colors.success800,
    },
    error: {
      contrastText: Colors.white,
      light: Colors.error300,
      main: Colors.error500,
      dark: Colors.error700,
    },
    background: {
      secondary: '#141619',
      primary: '#1D1F24',
      default: '#0C0D0F',
      paper: '#31343C',
    },
    info: {
      contrastText: Colors.white,
      light: Colors.smoke400,
      main: Colors.smoke800,
      dark: Colors.smoke900,
    },
    text: {
      secondary: '#959BAB',
      tertiary: '#31343C',
      disabled: Colors.secondary200,
      primary: '#FFFFFF',
      hint: '#626878',
    },
    divider: '#31343C',
    common: {
      black: Colors.black,
      white: Colors.white,
    },
  } as Palette,
};
