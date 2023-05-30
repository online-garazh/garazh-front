import * as process from 'process';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

import { Logo } from '~/components/common/logo';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { themeStoreMutations } from '~/stores/theme.store';

export const AuthLayoutHeader = memo(function AuthLayoutHeaderBase() {
  const { palette } = useTheme();
  const changeDarkModeHandler = () => {
    themeStoreMutations.toggleDarkMode();
  };

  return (
    <AppBar
      sx={({ palette, zIndex }) => ({
        backgroundColor: palette.background.default,
        position: 'absolute',
        zIndex: zIndex.drawer + 1,
        px: 0,
      })}
    >
      <Toolbar
        sx={({ breakpoints }) => ({
          justifyContent: 'space-between',
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          height: HEADER_HEIGHT,
          width: '100%',
          px: 2,
          [breakpoints.up('xs')]: {
            minHeight: HEADER_HEIGHT,
            px: 2,
          },
        })}
      >
        <Logo />

        {process.env.NEXT_PUBLIC_DARK_MODE_SWITCHING === 'true' && (
          <IconButton
            aria-label="toggle dark mode"
            onClick={changeDarkModeHandler}
            color="inherit"
            edge="end"
            sx={{ ml: 0.5 }}
          >
            {palette.mode === 'dark' ? <Brightness7Icon color="tertiary" /> : <Brightness4Icon color="tertiary" />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
});
