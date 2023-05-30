import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

import { Logo } from '~/components/common/logo';
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
          pl: 1,
          pr: 2,
          [breakpoints.up('xs')]: {
            minHeight: HEADER_HEIGHT,
            pl: 1,
            pr: 2,
          },
        })}
      >
        <Logo />

        <IconButton aria-label="toggle drawer" onClick={toggleDrawerHandler} color="inherit" edge="start">
          <MenuIcon />
        </IconButton>

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
