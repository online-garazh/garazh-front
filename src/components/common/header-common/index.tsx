import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { Button } from '~/components/common/button';
import { AccountMenu } from '~/components/common/header-common/account-menu';
import { Logo } from '~/components/common/logo';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { authService } from '~/services/auth.service';

type Props = {
  disableAuthButtons?: boolean;
  currentUser?: CurrentUserRes;
};

export const HeaderCommon = memo(function HeaderCommonBase(props: Props) {
  const { disableAuthButtons, currentUser } = props;
  const { palette } = useTheme();
  const { token } = authService();

  return (
    <AppBar
      sx={({ palette, zIndex, breakpoints }) => ({
        backgroundColor: palette.mode === 'dark' ? palette.background.default : palette.common.black,
        position: 'absolute',
        zIndex: zIndex.drawer + 1,
        px: 2,
        ...(palette.mode === 'dark' && {
          '&::after': {
            backgroundColor: palette.divider,
            position: 'absolute',
            content: '""',
            height: '1px',
            bottom: 0,
            width: '100%',
            left: 0,
          },
        }),
        [breakpoints.up('sm')]: {
          px: 3,
        },
      })}
    >
      <Toolbar
        sx={({ breakpoints }) => ({
          justifyContent: 'space-between',
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          height: HEADER_HEIGHT,
          width: '100%',
          p: 0,
          [breakpoints.up('xs')]: {
            minHeight: HEADER_HEIGHT,
            p: 0,
          },
        })}
      >
        <Logo onDarkBackground />

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
          {!currentUser && !disableAuthButtons && !token && (
            <>
              <Button
                href={RoutePaths.SIGN_IN}
                variant="outlined"
                color={palette.mode === 'dark' ? 'secondary' : 'primary'}
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
                color={palette.mode === 'dark' ? 'secondary' : 'primary'}
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
