import { Box, SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { type MouseEvent } from 'react';

import { icons } from '~/configs/icons.config';
import { RoutePaths } from '~/constants/routes.constant';

export function Logo() {
  const router = useRouter();
  const { palette } = useTheme();
  const logoClickHandler = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (router.pathname === RoutePaths.INDEX) return;

    void router.push(RoutePaths.INDEX);
  };

  return (
    <Box
      onClick={logoClickHandler}
      sx={({ palette, transitions }) => ({
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        display: 'flex',
        height: 32,
        width: 32,
        '& .MuiSvgIcon-root': {
          transition: transitions.create('color', {
            duration: transitions.duration.shortest,
            easing: transitions.easing.sharp,
          }),
        },
        '&:hover': {
          cursor: 'pointer',
          '& .MuiSvgIcon-root': {
            color: palette.mode === 'dark' ? palette.secondary.main : palette.primary.main,
          },
        },
      })}
    >
      <SvgIcon
        color={palette.mode === 'dark' ? 'primary' : 'secondary'}
        inheritViewBox
        component={icons.svg.logo}
        sx={{
          height: 32,
          width: 32,
        }}
      />
    </Box>
  );
}
