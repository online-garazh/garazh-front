import { components, themeConfig, typography } from '@/themes/config';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Shadows, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

import React, { ReactNode, createContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface ToggleColorModeProps {
  children: ReactNode;
  emotionCache: EmotionCache;
}

export function ToggleColorMode({
  children,
  emotionCache,
}: ToggleColorModeProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: themeConfig.palette[mode],
        shadows: Array(25).fill('none') as Shadows,
        typography,
        components,
      }),
    [mode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
