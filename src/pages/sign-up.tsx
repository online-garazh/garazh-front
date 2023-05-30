import { getLayout } from '~/components/layouts/auth-layout';
import { SignUpView } from '~/components/views/sign-up-view';
import { PagesSubTitles } from '~/types/page.type';

export default function SignUpRoute() {
  return <SignUpView />;
}

SignUpRoute.layoutConfig = {
  subTitle: PagesSubTitles.SIGN_UP,
};

SignUpRoute.getLayout = getLayout;
