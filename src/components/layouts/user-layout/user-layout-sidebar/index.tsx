import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import { Avatar, Drawer, IconButton, List, Stack } from '@mui/material';
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
import { UiElementNames, uiStore, uiStoreMutations } from '~/stores/ui.store';

import { type Props as LinkProps, UserLayoutSidebarLink } from './user-layout-sidebar-link';

type Props = {
  currentUser?: CurrentUserRes;
};

export const UserLayoutSidebar = memo(function UserLayoutSidebarBase(props: Props) {
  const { currentUser } = props;
  const snapshot = useSnapshot(uiStore);
  const sideIsOpen = snapshot.active[UiElementNames.USER_SIDEBAR] || false;
  const toggleDrawerHandler = () => {
    uiStoreMutations.toggleUi(UiElementNames.USER_SIDEBAR);
  };
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
        position: 'relative',
        '& .MuiDrawer-paper': {
          backgroundColor: palette.background.default,
          paddingTop: HEADER_HEIGHT / 8 + USER_SUB_HEADER_HEIGHT / 8 + 2,
          whiteSpace: 'nowrap',
          transition: transitions.create('width', {
            duration: transitions.duration.enteringScreen,
            easing: transitions.easing.sharp,
          }),
          overflowY: 'initial',
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
          height: '100%',
          width: USER_DRAWER_FULL_WIDTH,
          px: 1,
          pb: 2,
          ...(!sideIsOpen && {
            width: USER_DRAWER_ROLLED_WIDTH_XS,
          }),
          [breakpoints.up('sm')]: {
            paddingTop: HEADER_HEIGHT / 8 + USER_SUB_HEADER_HEIGHT / 8,
            width: sideIsOpen ? USER_DRAWER_FULL_WIDTH : USER_DRAWER_ROLLED_WIDTH,
          },
        },
      })}
    >
      <IconButton
        aria-label="toggle drawer"
        onClick={toggleDrawerHandler}
        color="secondary"
        sx={({ palette }) => ({
          backgroundColor: palette.background.primary,
          borderColor: palette.divider,
          borderStyle: 'solid',
          borderWidth: 1,
          transform: 'translateY(-50%)',
          position: 'absolute',
          height: 30,
          width: 30,
          right: -16,
          top: HEADER_HEIGHT + USER_SUB_HEADER_HEIGHT + 40,
          ...(palette.mode === 'dark' && {
            backgroundColor: palette.background.secondary,
            '& .MuiSvgIcon-root': {
              color: palette.secondary.contrastText,
            },
          }),
          '&:hover': {
            backgroundColor: palette.primary.main,
            borderColor: palette.primary.main,
            '& .MuiSvgIcon-root': {
              color: palette.primary.contrastText,
            },
            ...(palette.mode === 'dark' && {
              backgroundColor: palette.secondary.main,
              borderColor: palette.secondary.main,
              '& .MuiSvgIcon-root': {
                color: palette.secondary.contrastText,
              },
            }),
          },
        })}
      >
        <ExpandMoreIcon
          color="secondary"
          sx={() => ({
            transform: sideIsOpen ? 'rotate(90deg)' : 'rotate(270deg)',
          })}
        />
      </IconButton>

      {currentUser && (
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
              mr: 1,
              ...(!sideIsOpen && {
                height: 40,
                width: 40,
              }),
              [breakpoints.down('sm')]: {},
            })}
            src={currentUser.avatar ? currentUser.avatar : undefined}
          />

          {sideIsOpen && (
            <Box>
              {/* TODO: remove 'nickname' placeholder */}
              <Typography variant="body1_medium">{currentUser.nickName || 'nickname'}</Typography>

              <Typography
                component="p"
                variant="caption"
                color="secondary"
                sx={{
                  letterSpacing: '-0.15px',
                }}
              >
                {currentUser.email}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <Stack
        sx={{
          height: '100%',
          overflowY: 'auto',
          ...(!sideIsOpen && {
            overflowX: 'hidden',
          }),
        }}
      >
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
      </Stack>
    </Drawer>
  );
});
