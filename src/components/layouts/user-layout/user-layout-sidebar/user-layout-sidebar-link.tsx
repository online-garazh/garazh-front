import { ListItemText } from '@mui/material';
import { memo, type ReactNode } from 'react';

import { Link } from '~/components/common/next-link';
import { type RoutePaths } from '~/constants/routes.constant';
import { type UiILocators } from '~/constants/ui-locators.constant';

export type Props = {
  href: RoutePaths;
  icon: ReactNode;
  text: string;
  id: UiILocators;
};

export const UserLayoutSidebarLink = memo(function UserLayoutSidebarLinkBase(props: Props) {
  const { href, icon, text, id } = props;

  return (
    <Link
      href={href}
      id={id}
      sx={({ palette }) => ({
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex',
        color: palette.tertiary.main,
        '&:hover': {
          textDecoration: 'none',
        },
      })}
    >
      {icon}
      <ListItemText primary={text} />
    </Link>
  );
});
