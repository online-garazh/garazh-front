import { createTheme } from '@mui/material/styles';

/**
 * @description Base font size for rem - 16px. Base spacing unit is 8px
 * @example 1rem is 16px. spacing(2) is 16px
 */
export const defaultTheme = createTheme({
  breakpoints: {
    values: {
      // First variant
      xl: 1536,
      lg: 1200,
      md: 900,
      sm: 600,
      xs: 0,
      // Second variant
      // xl: 1440,
      // lg: 1128,
      // md: 992,
      // sm: 600,
      // xs: 0,
    },
  },

  typography: {
    htmlFontSize: 16,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
