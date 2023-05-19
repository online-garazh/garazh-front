import { Images } from '@/constants/images';
import { Button, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import styles from './styles.module.scss';

export interface HeaderAuthProps {}

export function HeaderAuth(props: HeaderAuthProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          <Link href="/">
            <Box
              component="span"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <SvgIcon
                component={Images.logo}
                sx={{ width: '45px', height: '45px' }}
                inheritViewBox
                className={styles.icon}
              />

              {/*<SvgIcon*/}
              {/*  component={Images.logoText}*/}
              {/*  sx={{ width: '140px', height: '35px' }}*/}
              {/*  inheritViewBox*/}
              {/*/>*/}
            </Box>
          </Link>
        </Box>

        <Link href="/auth/login/">
          <Button
            sx={{ marginRight: '16px' }}
            color="secondary"
            component="span"
            variant="text"
          >
            Увійти
          </Button>
        </Link>

        <Link href="/auth/signup/">
          <Button component="span" color="secondary" variant="outlined">
            Зареєструватись
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
