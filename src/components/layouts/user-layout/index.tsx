import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { type ReactElement, type ReactNode } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { UserLayoutSubHeader } from '~/components/layouts/user-layout/user-layout-sub-header';
import { HEADER_HEIGHT, USER_SUB_HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig, type RouteData } from '~/types/route.type';

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
      <UserLayoutSubHeader />
      <UserLayoutSidebar currentUser={currentUser} />

      <Box
        component="main"
        sx={{
          paddingTop: HEADER_HEIGHT / 8 + USER_SUB_HEADER_HEIGHT / 8,
          display: 'flex',
          width: '100%',
          flex: 1,
        }}
      >
        <Box
          sx={({ breakpoints, palette, shape }) => ({
            borderTopLeftRadius: shape.borderRadius * 4,
            backgroundColor: palette.background.primary,
            borderLeftColor: palette.divider,
            borderLeftStyle: 'solid',
            borderLeftWidth: 1,
            borderTopColor: palette.divider,
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            display: 'flex',
            width: '100%',
            flex: 1,
            p: 3,
            ...(palette.mode === 'dark' && {
              border: 0,
            }),
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

export const getLayout = (page: ReactElement, data: RouteData = {}): ReactNode => (
  <UserLayout layoutConfig={data.layoutConfig} currentUser={data.currentUser}>
    {page}
  </UserLayout>
);
