import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

import { Button } from '~/components/common/button';
import { Logo } from '~/components/common/logo';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { useCurrentUser } from '~/hooks/use-current-user.hook';
import { themeStoreMutations } from '~/stores/theme.store';
import { UiElementNames, uiStoreMutations } from '~/stores/ui.store';

type Props = {
  disableAuthButtons?: boolean;
  withSidebar?: boolean;
};

export const HeaderCommon = memo(function HeaderCommonBase(props: Props) {
  const { disableAuthButtons, withSidebar } = props;
  const { palette } = useTheme();
  const { currentUser } = useCurrentUser();
  const changeDarkModeHandler = () => {
    themeStoreMutations.toggleDarkMode();
  };
  const toggleDrawerHandler = () => {
    uiStoreMutations.toggleUi(UiElementNames.USER_SIDEBAR);
  };

  return (
    <AppBar
      sx={({ palette, zIndex }) => ({
        backgroundColor: palette.mode === 'dark' ? palette.background.default : palette.background.secondary,
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
          [breakpoints.up('xs')]: {
            minHeight: HEADER_HEIGHT,
          },
        })}
      >
        <Logo />

        <Box
          sx={({ breakpoints }) => ({
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            pl: 2,
            [breakpoints.up('sm')]: {
              pl: 3,
            },
          })}
        >
          {withSidebar && (
            <IconButton
              aria-label="toggle drawer"
              onClick={toggleDrawerHandler}
              color="inherit"
              edge="start"
              sx={{ marginRight: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!currentUser && !disableAuthButtons && (
            <>
              <Button
                href={RoutePaths.SIGN_IN}
                variant="outlined"
                color="secondary"
                size="medium"
                id={UiILocators.SIGN_IN_FORM_SUBMIT}
                sx={{
                  mr: 1,
                }}
              >
                Увійти
              </Button>

              <Button
                href={RoutePaths.SIGN_UP}
                variant="contained"
                color="secondary"
                size="medium"
                id={UiILocators.SIGN_IN_FORM_SUBMIT}
              >
                Реєстрація
              </Button>
            </>
          )}

          <IconButton
            aria-label="toggle dark mode"
            onClick={changeDarkModeHandler}
            color="inherit"
            edge="end"
            sx={{ ml: 0.5 }}
          >
            {palette.mode === 'dark' ? <Brightness7Icon color="tertiary" /> : <Brightness4Icon color="tertiary" />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
