import { Box, SvgIcon } from '@mui/material';
import { useRouter } from 'next/router';
import { type MouseEvent } from 'react';

import { icons } from '~/configs/icons.config';
import { RoutePaths } from '~/constants/routes.constant';

export function Logo() {
  const router = useRouter();
  const logoClickHandler = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (router.pathname === RoutePaths.INDEX) return;

    void router.push(RoutePaths.INDEX);
  };

  return (
    <Box
      onClick={logoClickHandler}
      sx={({ palette, transitions }) => ({
        backgroundColor: palette.background.primary,
        justifyContent: 'center',
        borderRadius: 2,
        transition: transitions.create('background-color', {
          duration: transitions.duration.shorter,
          easing: transitions.easing.sharp,
        }),
        alignItems: 'center',
        display: 'flex',
        height: 46,
        width: 56,
        '&:hover': {
          backgroundColor: palette.background.secondary,
          cursor: 'pointer',
        },
      })}
    >
      <SvgIcon
        color="primary"
        inheritViewBox
        component={icons.svg.logo}
        sx={{
          height: 30,
          width: 30,
        }}
      />
    </Box>
  );
}
