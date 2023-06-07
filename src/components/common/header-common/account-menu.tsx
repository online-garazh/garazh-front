import { Logout, Person, Settings } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, ListItemIcon, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { useState, type MouseEvent } from 'react';

import { useCurrentUserLogout } from '~/api/queries/get-current-user-logout.query';
import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { AccountAvatar } from '~/components/common/account-avatar';
import { Link } from '~/components/common/next-link';
import { RoutePaths } from '~/constants/routes.constant';
import { themeStoreMutations } from '~/stores/theme.store';

type Props = {
  user?: CurrentUserRes;
};

export function AccountMenu(props: Props) {
  const { user } = props;
  const userLogout = useCurrentUserLogout();
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const changeDarkModeHandler = () => {
    themeStoreMutations.toggleDarkMode();
  };
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        edge="end"
        sx={{ ml: 1.25, mr: -1, ...(user && { mr: -0.5 }) }}
      >
        {user ? (
          <AccountAvatar user={user} />
        ) : (
          <MenuIcon
            color="tertiary"
            sx={{
              height: 30,
              width: 30,
            }}
          />
        )}
      </IconButton>

      <Menu
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        MenuListProps={{
          disablePadding: false,
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            minWidth: 220,
            mt: 1,
            ...(!!user && {
              mt: 0.5,
            }),
          },
        }}
        autoFocus={false}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        id="account-menu"
      >
        <MenuItem onClick={changeDarkModeHandler}>
          <ListItemIcon>
            {palette.mode === 'dark' ? (
              <Brightness7Icon fontSize="small" color="tertiary" />
            ) : (
              <Brightness4Icon fontSize="small" color="tertiary" />
            )}
          </ListItemIcon>

          {palette.mode === 'dark' ? 'Світлий режим' : 'Темний режим'}
        </MenuItem>

        {!!user && <Divider />}

        {!!user && (
          <Link
            href={RoutePaths.PROFILE}
            sx={{
              display: 'block',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            id="test"
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" color="tertiary" />
              </ListItemIcon>
              Профіль
            </MenuItem>
          </Link>
        )}

        {!!user && (
          <Link
            href={RoutePaths.SETTINGS}
            sx={{
              display: 'block',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            id="test"
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" color="tertiary" />
              </ListItemIcon>
              Налаштування
            </MenuItem>
          </Link>
        )}

        {!!user && <Divider />}

        {!!user && (
          <MenuItem
            onClick={() => {
              handleClose();

              void userLogout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" color="tertiary" />
            </ListItemIcon>
            Вихід
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
