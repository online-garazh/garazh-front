import { dehydrate } from '@tanstack/react-query';

import { getLayout } from '~/components/layouts/auth/profile-settings-layout/profile-settings-layout';
import { SettingsView } from '~/components/views/settings-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';
import { ssrFetch } from '~/react-query/react-query.utils';
import { type CountryType } from '~/types/app.type';
import { type RouteConfig } from '~/types/route.type';
import { withSession } from '~/utils/with-session.util';

const ROUTE_CONFIG: RouteConfig = {
  disableRedirect: true,
  requireAuth: true,
};

interface SettingsRouteProps {
  countries: CountryType[];
}

export default function SettingsRoute({ countries }: SettingsRouteProps) {
  return <SettingsView countries={countries} />;
}

export const getServerSideProps = withSession(async (_ctx, client) => {
  const countries = await ssrFetch({
    url: '/countries',
  });

  return {
    props: {
      countries,
      dehydratedState: dehydrate(client),
    },
  };
}, ROUTE_CONFIG);

SettingsRoute.layoutConfig = {
  subTitle: RoutesBasicSubTitles.SETTINGS,
};

SettingsRoute.getLayout = getLayout;
