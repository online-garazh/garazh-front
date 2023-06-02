import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Drawer, List } from '@mui/material';
import { memo } from 'react';
import { useSnapshot } from 'valtio/react';

import {
  USER_DRAWER_FULL_WIDTH,
  USER_DRAWER_ROLLED_WIDTH,
  HEADER_HEIGHT,
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
      href: RoutePaths.FEED,
      icon: <FeedOutlinedIcon />,
      text: 'Стрічка',
      id: UiILocators.USER_LAYOUT_SIDEBAR_FEED_LINK,
    },
    {
      href: RoutePaths.MY_GARAGE,
      icon: <DirectionsCarFilledOutlinedIcon />,
      text: 'Мій гараж',
      id: UiILocators.USER_LAYOUT_SIDEBAR_MY_GARAGE_LINK,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={({ breakpoints, transitions, palette }) => ({
        '& .MuiDrawer-paper': {
          border: 'none',
          borderRightColor: palette.divider,
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          backgroundColor: palette.background.default,
          whiteSpace: 'nowrap',
          transition: transitions.create('width', {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
          }),
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          width: USER_DRAWER_FULL_WIDTH,
          ...(!sideIsOpen && {
            overflowX: 'hidden',
            width: USER_DRAWER_ROLLED_WIDTH_XS,
          }),
          ...(palette.mode === 'dark' && {
            borderColor: 'transparent',
          }),
          [breakpoints.up('sm')]: {
            width: sideIsOpen ? USER_DRAWER_FULL_WIDTH : USER_DRAWER_ROLLED_WIDTH,
          },
        },
      })}
    >
      <List component="nav" sx={{ p: 0, paddingTop: HEADER_HEIGHT / 8 + 1.5, px: 1 }}>
        {links.map(({ href, text, icon, id }) => (
          <UserLayoutSidebarLink href={href} text={text} icon={icon} key={`${id}-list-item`} id={id} />
        ))}
      </List>
    </Drawer>
  );
});
