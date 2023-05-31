import { Box } from '@mui/material';
import { type ReactElement, type ReactNode } from 'react';

import { HeaderCommon } from '~/components/common/header-common';
import { UserLayoutSidebar } from '~/components/layouts/user-layout/user-layout-sidebar';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig } from '~/types/page.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

export function UserLayout(props: Props) {
  const { layoutConfig, children } = props;

  return (
    <Box
      sx={{
        overflow: 'auto',
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        width: '100%',
      }}
    >
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} withSidebar />
      <UserLayoutSidebar />

      <Box
        component="main"
        sx={{
          paddingTop: HEADER_HEIGHT / 8,
          display: 'flex',
          width: '100%',
          flex: 1,
        }}
      >
        <Box
          sx={({ palette, shape }) => ({
            borderTopLeftRadius: shape.borderRadius * 2,
            backgroundColor: palette.background.primary,
            display: 'flex',
            width: '100%',
            flex: 1,
          })}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export const getLayout = (page: ReactElement, layoutConfig?: LayoutConfig): ReactNode => (
  <UserLayout layoutConfig={layoutConfig}>{page}</UserLayout>
);
