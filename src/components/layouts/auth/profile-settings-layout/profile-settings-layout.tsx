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
  import('../../user-layout/user-layout-sub-header').then((mod) => mod.UserLayoutSubHeader)
);
const UserLayoutSidebar = dynamic(() =>
  import('../../user-layout/user-layout-sidebar').then((mod) => mod.UserLayoutSidebar)
);
const HeaderCommon = dynamic(() => import('../../../common/header-common').then((mod) => mod.HeaderCommon));

export function SettingsLayout(props: Props) {
  const { layoutConfig, currentUser, children } = props;

  return (
    <Box
      sx={{
        overflow: 'auto',
        flexGrow: 1,
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} currentUser={currentUser} />
      <UserLayoutSubHeader />
      <UserLayoutSidebar currentUser={currentUser} />

      <Box
        component="main"
        sx={{
          paddingTop: HEADER_HEIGHT / 7 + USER_SUB_HEADER_HEIGHT / 7,
          display: 'flex',
          width: '100%',
          flex: 1,
        }}
      >
        <Box
          sx={({ breakpoints, palette }) => ({
            // borderTopLeftRadius: shape.borderRadius * 4,
            // borderTopRightRadius: shape.borderRadius * 4,
            backgroundColor: palette.background.primary,
            borderLeftColor: palette.divider,
            borderLeftStyle: 'dashed',
            borderLeftWidth: 1,
            borderRightStyle: 'dashed',
            borderRightWidth: 1,
            // borderTopColor: palette.divider,
            borderRightColor: palette.divider,
            // borderTopStyle: 'dashed',
            // borderTopWidth: 1,
            display: 'flex',
            width: '100%',
            flex: 1,
            pl: 6,
            pr: 3,
            pt: 5,
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
  <SettingsLayout layoutConfig={data.layoutConfig} currentUser={data.currentUser}>
    {page}
  </SettingsLayout>
);
