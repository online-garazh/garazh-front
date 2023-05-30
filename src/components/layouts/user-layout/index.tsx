import { Box } from '@mui/material';
import { type ReactElement, type ReactNode } from 'react';

import { UserLayoutHeader } from '~/components/layouts/user-layout/user-layout-header';
import { UserLayoutSidebar } from '~/components/layouts/user-layout/user-layout-sidebar';
import { type LayoutConfig } from '~/types/page.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

export function UserLayout(props: Props) {
  const { children } = props;

  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: palette.background.primary,
        overflow: 'auto',
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        width: '100%',
      })}
    >
      <UserLayoutHeader />
      <UserLayoutSidebar />

      <Box
        component="main"
        sx={{
          width: '100%',
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export const getLayout = (page: ReactElement, layoutConfig?: LayoutConfig): ReactNode => (
  <UserLayout layoutConfig={layoutConfig}>{page}</UserLayout>
);
