import Typography from '@mui/material/Typography';
import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/landing-layout';
import { type RouteConfig } from '~/types/app.type';
import { PagesSubTitles } from '~/types/page.type';
import { useApiQuery } from '~/utils/api';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  requireAuth: false,
};

export default function LandingRoute() {
  const { data } = useApiQuery(['posts'], '/posts');

  console.info('data', data);

  return (
    <Typography component="h1" variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
      Landing
    </Typography>
  );
}

export const getServerSideProps = withSession(
  async (_ctx, client) => ({
    props: {
      dehydratedState: dehydrate(client),
    },
  }),
  ROUTE_CONFIG
);

LandingRoute.layoutConfig = {
  subTitle: PagesSubTitles.INDEX,
};

LandingRoute.getLayout = getLayout;
