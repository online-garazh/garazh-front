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
      sx={{
        height: 40,
        width: 40,
      }}
    >
      <SvgIcon
        color="primary"
        inheritViewBox
        component={icons.svg.logo}
        sx={{
          height: 40,
          width: 40,
        }}
      />
    </Box>
  );
}
