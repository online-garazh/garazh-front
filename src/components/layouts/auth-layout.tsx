import { Box, Container } from '@mui/material';
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

const HeaderCommon = dynamic(() => import('../common/header-common').then((mod) => mod.HeaderCommon));

export function AuthLayout(props: Props) {
  const { layoutConfig, currentUser, children } = props;

  return (
    <Box sx={{ flexDirection: 'column', minHeight: '100vh', display: 'flex' }}>
      <HeaderCommon disableAuthButtons={layoutConfig?.disableAuthButtons} currentUser={currentUser} />

      <Box
        component="main"
        sx={({ palette }) => ({
          backgroundColor: palette.background.primary,
          paddingTop: HEADER_HEIGHT / 8,
          display: 'flex',
          flex: 1,
        })}
      >
        <Container
          maxWidth="xs"
          sx={({ breakpoints }) => ({
            pb: 8,
            [breakpoints.down('sm')]: {
              pb: 4,
            },
          })}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export const getLayout = (page: ReactElement, data: PageData = {}): ReactNode => (
  <AuthLayout layoutConfig={data.layoutConfig} currentUser={data.currentUser}>
    {page}
  </AuthLayout>
);
