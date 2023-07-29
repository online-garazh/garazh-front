import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import { List } from '@mui/material';
import Box from '@mui/material/Box';
import { memo } from 'react';

import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';

import { type Props as LinkProps, UserLayoutSubHeaderLink } from './user-layout-sub-header-link';

export const UserLayoutSubHeader = memo(function UserLayoutSubHeaderBase() {
  const links: LinkProps[] = [
    {
      href: RoutePaths.CARS,
      icon: <DirectionsCarFilledOutlinedIcon />,
      text: 'Автомобілі',
      id: UiILocators.USER_LAYOUT_SUB_HEADER_CARS_LINK,
    },
    {
      href: RoutePaths.LOG_BOOKS,
      icon: <AutoStoriesOutlinedIcon />,
      text: 'Бортжурнали',
      id: UiILocators.USER_LAYOUT_SUB_HEADER_LOG_BOOKS_LINK,
    },
    {
      href: RoutePaths.COMMUNITIES,
      icon: <PeopleAltOutlinedIcon />,
      text: 'Спільноти',
      id: UiILocators.USER_LAYOUT_SUB_HEADER_COMMUNITIES_LINK,
    },
    {
      href: RoutePaths.SHOPS,
      icon: <BuildOutlinedIcon />,
      text: 'Автосервіси та магазини',
      id: UiILocators.USER_LAYOUT_SUB_HEADER_SHOPS_LINK,
    },
    {
      href: RoutePaths.FLEA_MARKET,
      icon: <TakeoutDiningOutlinedIcon />,
      text: 'Барахолка',
      id: UiILocators.USER_LAYOUT_SUB_HEADER_FLEA_MARKET_LINK,
    },
  ];

  return (
    <Box
      sx={({ breakpoints, palette, zIndex }) => ({
        backgroundColor: palette.background.default,
        boxShadow: 'rgba(145, 158, 171, 0.1) 0px 8px 16px 0px',
        position: 'absolute',
        overflow: 'hidden',
        maxWidth: '100%',
        zIndex: zIndex.drawer + 1,
        width: '100%',
        paddingTop: '12px',
        paddingBottom: '12px',
        top: HEADER_HEIGHT,
        px: 2,
        [breakpoints.up('sm')]: {
          px: 3,
        },
      })}
    >
      <List
        component="nav"
        sx={{ p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
      >
        {links.map(({ href, text, icon, id }) => (
          <UserLayoutSubHeaderLink href={href} text={text} icon={icon} key={`${id}-list-item`} id={id} />
        ))}
      </List>
    </Box>
  );
});
