import process from 'process';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { themeStoreMutations } from '~/stores/theme.store';
import { UiElementNames, uiStoreMutations } from '~/stores/ui.store';

export const UserLayoutHeader = memo(function UserLayoutHeaderBase() {
  const { palette } = useTheme();
  const changeDarkModeHandler = () => {
    themeStoreMutations.toggleDarkMode();
  };
  const toggleDrawerHandler = () => {
    uiStoreMutations.toggleUi(UiElementNames.USER_SIDEBAR);
  };

  return (
    <AppBar
      sx={({ zIndex }) => ({
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
        <IconButton aria-label="toggle drawer" onClick={toggleDrawerHandler} color="inherit" edge="start">
          <MenuIcon />
        </IconButton>

        {process.env.NEXT_PUBLIC_DARK_MODE_SWITCHING === 'true' && (
          <IconButton
            aria-label="toggle dark mode"
            onClick={changeDarkModeHandler}
            color="inherit"
            edge="end"
            sx={{ ml: 1 }}
          >
            {palette.mode === 'dark' ? <Brightness7Icon color="secondary" /> : <Brightness4Icon color="secondary" />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
});