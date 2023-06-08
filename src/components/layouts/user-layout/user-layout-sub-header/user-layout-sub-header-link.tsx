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

export const UserLayoutSubHeaderLink = memo(function UserLayoutSubHeaderLinkBase(props: Props) {
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
        ...(selectedLink && {
          pointerEvents: 'none',
          li: {
            color: palette.mode === 'dark' ? palette.secondary.main : palette.primary.main,
          },
        }),
        mr: 1,
        '&:last-of-type': {
          mr: 0,
        },
        '&:hover': {
          textDecoration: 'none',
          li: {
            color: palette.mode === 'dark' ? palette.secondary.main : palette.primary.main,
          },
        },
      })}
    >
      <ListItem
        sx={{
          borderRadius: 2,
          px: 1,
          py: 0.5,
        }}
      >
        <Box
          sx={({ breakpoints }) => ({
            height: 24,
            width: 24,
            mr: 1,
            [breakpoints.up('sm')]: {},
          })}
        >
          {icon}
        </Box>

        <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>
          {text}
        </Typography>
      </ListItem>
    </Link>
  );
});
