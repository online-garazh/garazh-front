import { Box, SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { type MouseEvent } from 'react';

import { icons } from '~/configs/icons.config';
import { RoutePaths } from '~/constants/routes.constant';

type Props = {
  onDarkBackground?: boolean;
};

export function Logo(props: Props) {
  const { onDarkBackground } = props;
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
        height: 44,
        width: 44,
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
        inheritViewBox
        component={icons.svg.logo}
        color={palette.mode === 'dark' ? 'primary' : 'secondary'}
        sx={({ palette }) => ({
          height: 44,
          width: 44,
          ...(onDarkBackground &&
            palette.mode !== 'dark' && {
              color: palette.common.white,
            }),
        })}
      />
    </Box>
  );
}
