import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import { Avatar, Drawer, List } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSnapshot } from 'valtio/react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import {
  USER_DRAWER_FULL_WIDTH,
  USER_DRAWER_ROLLED_WIDTH,
  HEADER_HEIGHT,
  USER_DRAWER_ROLLED_WIDTH_XS,
  USER_SUB_HEADER_HEIGHT,
} from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';
import { UiElementNames, uiStore } from '~/stores/ui.store';

import { type Props as LinkProps, UserLayoutSidebarLink } from './user-layout-sidebar-link';

type Props = {
  currentUser?: CurrentUserRes;
};

export const UserLayoutSidebar = memo(function UserLayoutSidebarBase(props: Props) {
  const { currentUser } = props;
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
      icon: <HouseSidingIcon />,
      text: 'Мій гараж',
      id: UiILocators.USER_LAYOUT_SIDEBAR_MY_GARAGE_LINK,
    },
    {
      href: RoutePaths.LOG_BOOKS,
      icon: <AutoStoriesOutlinedIcon />,
      text: 'Бортжурнали',
      id: UiILocators.USER_LAYOUT_SIDEBAR_LOG_BOOKS_LINK,
    },
    {
      href: RoutePaths.COMMUNITIES,
      icon: <PeopleAltOutlinedIcon />,
      text: 'Спільноти',
      id: UiILocators.USER_LAYOUT_SIDEBAR_COMMUNITIES_LINK,
    },
    {
      href: RoutePaths.SHOPS,
      icon: <BuildOutlinedIcon />,
      text: 'Автосервіси та магазини',
      id: UiILocators.USER_LAYOUT_SIDEBAR_SHOPS_LINK,
    },
    {
      href: RoutePaths.FLEA_MARKET,
      icon: <TakeoutDiningOutlinedIcon />,
      text: 'Барахолка',
      id: UiILocators.USER_LAYOUT_SIDEBAR_FLEA_MARKET_LINK,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={({ breakpoints, transitions, palette }) => ({
        '& .MuiDrawer-paper': {
          backgroundColor: palette.background.default,
          paddingTop: HEADER_HEIGHT / 8 + USER_SUB_HEADER_HEIGHT / 8 + 2,
          whiteSpace: 'nowrap',
          transition: transitions.create('width', {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
          }),
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
          height: '100%',
          width: USER_DRAWER_FULL_WIDTH,
          px: 1,
          ...(!sideIsOpen && {
            overflowX: 'hidden',
            width: USER_DRAWER_ROLLED_WIDTH_XS,
          }),
          [breakpoints.up('sm')]: {
            paddingTop: HEADER_HEIGHT / 8 + USER_SUB_HEADER_HEIGHT / 8,
            width: sideIsOpen ? USER_DRAWER_FULL_WIDTH : USER_DRAWER_ROLLED_WIDTH,
          },
        },
      })}
    >
      <Box
        sx={({ breakpoints, palette }) => ({
          backgroundColor: palette.mode === 'dark' ? palette.background.primary : palette.background.secondary,
          borderRadius: 4,
          alignItems: 'center',
          minHeight: 80,
          display: 'flex',
          mb: 3,
          p: 1,
          [breakpoints.down('sm')]: {},
        })}
      >
        <Avatar
          sx={({ breakpoints }) => ({
            height: 56,
            width: 56,
            ...(!sideIsOpen && {
              height: 40,
              width: 40,
            }),
            [breakpoints.down('sm')]: {},
          })}
          src={currentUser?.avatar ?? undefined}
        />

        <Box>
          <Typography>{currentUser?.nickName}</Typography>
          <Typography variant="caption">{currentUser?.email}</Typography>
        </Box>
      </Box>

      <Typography
        component="p"
        variant="caption"
        sx={({ breakpoints }) => ({
          textTransform: 'uppercase',
          width: '100%',
          px: 1,
          mb: 1,
          ...(!sideIsOpen && {
            letterSpacing: '-0.5px',
            px: 0,
          }),
          [breakpoints.up('sm')]: {
            px: 2,
            ...(!sideIsOpen && {
              px: 0,
            }),
          },
        })}
      >
        Загальне
      </Typography>

      <List component="nav" sx={{ p: 0 }}>
        {links.map(({ href, text, icon, id }) => (
          <UserLayoutSidebarLink href={href} text={text} icon={icon} key={`${id}-list-item`} id={id} />
        ))}
      </List>
    </Drawer>
  );
});
