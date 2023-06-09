import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { type ReactElement, type ReactNode } from 'react';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { HEADER_HEIGHT, USER_SUB_HEADER_HEIGHT } from '~/configs/mui-components.config';
import { type LayoutConfig, type RouteData } from '~/types/route.type';

type Props = {
  layoutConfig?: LayoutConfig;
  currentUser?: CurrentUserRes;
  children: ReactNode;
};

const UserLayoutSubHeader = dynamic(() =>
  import('../user-layout/user-layout-sub-header').then((mod) => mod.UserLayoutSubHeader)
);
const UserLayoutSidebar = dynamic(() =>
  import('../user-layout/user-layout-sidebar').then((mod) => mod.UserLayoutSidebar)
);
const HeaderCommon = dynamic(() => import('../../common/header-common').then((mod) => mod.HeaderCommon));

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
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} currentUser={currentUser} />
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
            pl: 5,
            pr: 3,
            pt: 2.5,
            pb: 6,
            ...(palette.mode === 'dark' && {
              border: 0,
            }),
            [breakpoints.down('sm')]: {
              px: 2,
              pb: 4,
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
