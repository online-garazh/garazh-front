import { Box, Container } from '@mui/material';
import { type ReactElement, type ReactNode } from 'react';

import { AuthLayoutHeader } from '~/components/layouts/auth-layout/auth-layout-header';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig } from '~/types/page.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

export function AuthLayout(props: Props) {
  const { children } = props;

  return (
    <Box sx={{ flexDirection: 'column', minHeight: '100vh', display: 'flex' }}>
      <AuthLayoutHeader />

      <Box
        component="main"
        sx={({ palette }) => ({
          backgroundColor: palette.background.primary,
          paddingTop: `${HEADER_HEIGHT}px`,
          display: 'flex',
          flex: 1,
        })}
      >
        <Container maxWidth="xs">{children}</Container>
      </Box>
    </Box>
  );
}

export const getLayout = (page: ReactElement, layoutConfig?: LayoutConfig): ReactNode => (
  <AuthLayout layoutConfig={layoutConfig}>{page}</AuthLayout>
);
