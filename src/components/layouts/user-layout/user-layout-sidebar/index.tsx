import FeedIcon from '@mui/icons-material/Feed';
import GarageIcon from '@mui/icons-material/Garage';
import { Drawer, List } from '@mui/material';
import { memo } from 'react';
import { useSnapshot } from 'valtio/react';

import { USER_DRAWER_FULL_WIDTH, USER_DRAWER_ROLLED_WIDTH, HEADER_HEIGHT } from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { UiElementNames, uiStore } from '~/stores/ui.store';

import { type Props as LinkProps, UserLayoutSidebarLink } from './user-layout-sidebar-link';

export const UserLayoutSidebar = memo(function UserLayoutSidebarBase() {
  const snapshot = useSnapshot(uiStore);
  const sideIsOpen = snapshot.active[UiElementNames.USER_SIDEBAR] || false;
  const links: LinkProps[] = [
    {
      href: RoutePaths.FEED,
      icon: <FeedIcon />,
      text: 'Стрічка',
      id: UiILocators.USER_LAYOUT_SIDEBAR_FEED_LINK,
    },
    {
      href: RoutePaths.MY_GARAGE,
      icon: <GarageIcon />,
      text: 'Мій гараж',
      id: UiILocators.USER_LAYOUT_SIDEBAR_MY_GARAGE_LINK,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={({ transitions, palette }) => ({
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
          }),
        },
      })}
    >
      <List component="nav" sx={{ p: 0, paddingTop: HEADER_HEIGHT / 8, px: 1 }}>
        {links.map(({ href, text, icon, id }) => (
          <UserLayoutSidebarLink href={href} text={text} icon={icon} key={`${id}-list-item`} id={id} />
        ))}
      </List>
    </Drawer>
  );
});
