import { type EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { type ReactNode, useMemo } from 'react';
import { useSnapshot } from 'valtio/react';

import { themeStore } from '~/stores/theme.store';
import { createAppTheme } from '~/theme/create-app-theme';

type Props = {
  emotionCache: EmotionCache;
  children: ReactNode;
};

export function ThemeProvider(props: Props) {
  const { emotionCache, children } = props;
  const themeStoreSnapshot = useSnapshot(themeStore);
  const theme = useMemo(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => createAppTheme(themeStoreSnapshot.darkMode ? 'dark' : 'light'),
    [themeStoreSnapshot.darkMode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
