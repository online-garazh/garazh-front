import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
          li: {
            backgroundColor: palette.mode === 'dark' ? palette.secondary.main : palette.primary.main,
            color: palette.secondary.contrastText,
          },
        },
      })}
    >
      <ListItem
        sx={({ breakpoints }) => ({
          borderRadius: 2,
          px: 1,
          py: 1,
          [breakpoints.up('sm')]: {
            pl: 2,
            pr: 1,
            py: 1.5,
          },
        })}
      >
        <Box
          sx={({ breakpoints }) => ({
            height: 24,
            width: 24,
            mr: 2,
            [breakpoints.up('sm')]: {
              mr: 3,
            },
          })}
        >
          {icon}
        </Box>

        <Typography variant="body1">{text}</Typography>
      </ListItem>
    </Link>
  );
});
