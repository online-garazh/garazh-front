import { Box, Container } from '@mui/material';
import { type ReactElement, type ReactNode } from 'react';

import { HeaderCommon } from '~/components/common/header-common';
import { LandingLayoutFooter } from '~/components/layouts/landing-layout/landing-layout-footer';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig } from '~/types/page.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

export function LandingLayout(props: Props) {
  const { layoutConfig, children } = props;

  return (
    <Box sx={{ flexDirection: 'column', minHeight: '100vh', display: 'flex' }}>
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} />

      <Box
        component="main"
        sx={({ palette }) => ({
          backgroundColor: palette.background.primary,
          paddingTop: `${HEADER_HEIGHT}px`,
          display: 'flex',
          flex: 1,
        })}
      >
        <Container
          sx={({ breakpoints }) => ({
            [breakpoints.up('xs')]: {
              maxWidth: '100%',
              px: 0,
            },
          })}
        >
          {children}
        </Container>
      </Box>

      <LandingLayoutFooter />
    </Box>
  );
}

export const getLayout = (page: ReactElement, layoutConfig?: LayoutConfig): ReactNode => (
  <LandingLayout layoutConfig={layoutConfig}>{page}</LandingLayout>
);
