import { type Palette } from '@mui/material';

import { Colors } from '~/theme/colors';

export const appPalette = {
  light: {
    primary: {
      contrastText: Colors.white,
      light: '#33BC77',
      main: '#00AB55',
      dark: '#008944',
    },
    secondary: {
      contrastText: Colors.white,
      light: '#0C0D0F',
      main: '#0C0D0F',
      dark: '#0C0D0F',
    },
    tertiary: {
      contrastText: Colors.white,
      light: '#959BAB',
      main: '#212b36',
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
      secondary: '#F4F4F4',
      primary: Colors.white,
      default: Colors.white,
      paper: '#FBFBFB',
    },
    info: {
      contrastText: Colors.white,
      light: Colors.smoke400,
      main: Colors.smoke800,
      dark: Colors.smoke900,
    },
    text: {
      secondary: '#637381',
      tertiary: '#31343C',
      disabled: Colors.secondary200,
      primary: '#0C0D0F',
      hint: '#626878',
    },
    divider: Colors.secondary200,
    common: {
      black: '#0C0D0F',
      white: Colors.white,
    },
  } as Palette,

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
      black: '#0C0D0F',
      white: Colors.white,
    },
  } as Palette,
};
