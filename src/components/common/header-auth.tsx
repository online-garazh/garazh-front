import { Button, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

import { icons } from '~/configs/icons.config';

export function HeaderAuth() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          <Link href="/">
            <Box component="span" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <SvgIcon component={icons.svg.logo} sx={{ width: '45px', height: '45px' }} inheritViewBox />
            </Box>
          </Link>
        </Box>

        <Link href="/sign-in">
          <Button sx={{ marginRight: '16px' }} color="secondary" component="span" variant="text">
            Увійти
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button component="span" color="secondary" variant="outlined">
            Зареєструватись
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
