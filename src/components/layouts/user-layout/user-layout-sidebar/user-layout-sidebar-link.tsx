import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const selectedLink = router.pathname.includes(href);

  return (
    <Link
      href={href}
      id={id}
      sx={({ palette }) => ({
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex',
        color: palette.tertiary.main,
        mb: 0.5,
        ...(selectedLink && {
          pointerEvents: 'none',
          li: {
            backgroundColor: palette.mode === 'dark' ? palette.secondary.main : palette.primary.main,
            color: palette.secondary.contrastText,
          },
        }),
        '&:hover': {
          textDecoration: 'none',
          li: {
            backgroundColor: palette.mode === 'dark' ? palette.background.primary : palette.background.secondary,
          },
        },
      })}
    >
      <ListItem
        sx={({ breakpoints }) => ({
          borderRadius: 2,
          px: 1,
          py: 1.5,
          [breakpoints.up('sm')]: {
            px: 2,
            py: 2,
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

        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
          {text}
        </Typography>
      </ListItem>
    </Link>
  );
});
