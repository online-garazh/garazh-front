import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Drawer, List, ListItem } from '@mui/material';
import { memo } from 'react';
import { useSnapshot } from 'valtio/esm/react';

import {
  USER_DRAWER_FULL_WIDTH,
  USER_DRAWER_ROLLED_WIDTH,
  USER_DRAWER_ROLLED_WIDTH_XS,
} from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { UiElementNames, uiStore } from '~/stores/ui.store';

import { type Props as LinkProps, UserLayoutSidebarLink } from './user-layout-sidebar-link';

export const UserLayoutSidebar = memo(function UserLayoutSidebarBase() {
  const snapshot = useSnapshot(uiStore);
  const sideIsOpen = snapshot.active[UiElementNames.USER_SIDEBAR] || false;
  const links: LinkProps[] = [
    {
      href: RoutePaths.HOME,
      icon: <DashboardIcon />,
      text: 'Home',
      id: UiILocators.USER_LAYOUT_SIDEBAR_HOME_LINK,
    },
    {
      href: RoutePaths.PROFILE,
      icon: <PeopleIcon />,
      text: 'Profile',
      id: UiILocators.USER_LAYOUT_SIDEBAR_PROFILE_LINK,
    },
    {
      href: RoutePaths.SETTINGS,
      icon: <PeopleIcon />,
      text: 'Settings',
      id: UiILocators.USER_LAYOUT_SIDEBAR_SETTINGS_LINK,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={({ breakpoints, transitions, palette }) => ({
        '& .MuiDrawer-paper': {
          backgroundColor: palette.background.default,
          whiteSpace: 'nowrap',
          transition: transitions.create('width', {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
          }),
          boxSizing: 'border-box',
          position: 'relative',
          width: USER_DRAWER_FULL_WIDTH,
          border: 'none',
          ...(!sideIsOpen && {
            transition: transitions.create('width', {
              duration: transitions.duration.leavingScreen,
              easing: transitions.easing.sharp,
            }),
            overflowX: 'hidden',
            width: USER_DRAWER_ROLLED_WIDTH,
            [breakpoints.down('sm')]: {
              width: USER_DRAWER_ROLLED_WIDTH_XS,
            },
          }),
        },
      })}
    >
      <List component="nav" sx={{ p: 0, pt: 8 }}>
        {links.map(({ href, text, icon, id }) => (
          <ListItem key={`${id}-list-item`} sx={{ pl: 2 }}>
            <UserLayoutSidebarLink href={href} text={text} icon={icon} id={id} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
});
