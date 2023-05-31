import { getLayout } from '~/components/layouts/auth-layout';
import { SignUpView } from '~/components/views/sign-up-view';
import { RoutesBasicSubTitles } from '~/constants/routes.constant';

export default function SignUpRoute() {
  return <SignUpView />;
}

SignUpRoute.layoutConfig = {
  disableAuthButtons: true,
  subTitle: RoutesBasicSubTitles.SIGN_UP,
};

SignUpRoute.getLayout = getLayout;
