import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import { memo } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { Button } from '~/components/common/button';
import { AccountMenu } from '~/components/common/header-common/account-menu';
import { Logo } from '~/components/common/logo';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { authService } from '~/services/auth.service';
import { UiElementNames, uiStoreMutations } from '~/stores/ui.store';

type Props = {
  disableAuthButtons?: boolean;
  withSidebar?: boolean;
  currentUser?: CurrentUserRes;
};

export const HeaderCommon = memo(function HeaderCommonBase(props: Props) {
  const { disableAuthButtons, withSidebar, currentUser } = props;
  // const { data: currentUser } = useGetCurrentUser();
  const { token } = authService();
  const toggleDrawerHandler = () => {
    uiStoreMutations.toggleUi(UiElementNames.USER_SIDEBAR);
  };

  return (
    <AppBar
      sx={({ palette, zIndex, breakpoints }) => ({
        backgroundColor: palette.background.default,
        position: 'absolute',
        zIndex: zIndex.drawer + 1,
        px: 2,
        [breakpoints.up('sm')]: {
          px: 3,
        },
      })}
    >
      <Toolbar
        sx={({ breakpoints, palette }) => ({
          justifyContent: 'space-between',
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          height: HEADER_HEIGHT,
          width: '100%',
          borderBottomColor: palette.divider,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          ...(palette.mode === 'dark' && {
            borderColor: 'transparent',
          }),
          padding: 0,
          [breakpoints.up('xs')]: {
            minHeight: HEADER_HEIGHT,
            padding: 0,
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
              <MenuIcon color="tertiary" />
            </IconButton>
          )}

          {!currentUser && !disableAuthButtons && !token && (
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

          <AccountMenu user={currentUser} />
        </Box>
      </Toolbar>
    </AppBar>
  );
});
