import type {} from '@mui/lab/themeAugmentation';
import { ThemeOptions } from '@mui/material/styles';

export const components: ThemeOptions['components'] = {
  MuiTextField: {
    styleOverrides: {
      root: (theme) => {
        return {
          '& .MuiOutlinedInput-root': {
            borderColor: theme.theme?.palette?.grey?.[50],
            borderRadius: '8px',
          },
        };
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: (theme) => {
        return {
          color: theme.theme?.palette?.grey?.[50],
        };
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: (theme) => {
        return {
          borderColor: theme.theme?.palette?.grey?.[50],
          borderRadius: '8px',
          '&:hover fieldset': {
            borderColor: theme.theme?.palette?.secondary?.main,
          },
        };
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: (theme) => ({
        borderRadius: '8px',
        '&:hover': {},
      }),

      sizeLarge: {
        padding: '11px 22px',
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: (theme) => ({
        marginLeft: '0px',
      }),
    },
  },

  MuiLoadingButton: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          backgroundColor: 'black',
        },

        '.MuiLoadingButton-loadingIndicator': {
          color: '#fff',
        },
      },
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      root: {
        width: '25px !important',
        height: '25px !important',
      },
    },
  },
};
