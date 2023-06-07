import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { type ReactElement, type ReactNode } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig, type PageData } from '~/types/page.type';

type Props = {
  layoutConfig?: LayoutConfig;
  currentUser?: CurrentUserRes;
  children: ReactNode;
};

const HeaderCommon = dynamic(() => import('../../common/header-common').then((mod) => mod.HeaderCommon));
const UserLayoutSidebar = dynamic(() =>
  import('../user-layout/user-layout-sidebar').then((mod) => mod.UserLayoutSidebar)
);

export function UserLayout(props: Props) {
  const { layoutConfig, currentUser, children } = props;

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
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} withSidebar currentUser={currentUser} />
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
          sx={({ breakpoints, palette, shape }) => ({
            borderTopLeftRadius: shape.borderRadius * 2,
            backgroundColor: palette.background.primary,
            display: 'flex',
            width: '100%',
            flex: 1,
            p: 3,
            [breakpoints.down('sm')]: {
              pl: 2,
            },
          })}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export const getLayout = (page: ReactElement, data: PageData = {}): ReactNode => (
  <UserLayout layoutConfig={data.layoutConfig} currentUser={data.currentUser}>
    {page}
  </UserLayout>
);
