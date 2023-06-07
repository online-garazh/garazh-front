import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { SnackbarProvider } from 'notistack';
import { memo, type ReactNode } from 'react';

import { DefaultSeo } from '~/components/common/default-seo';
import { ErrorBoundary } from '~/components/common/error-boundary';
import { useBodyBgColor } from '~/hooks/use-body-bg-color.hook';
import { type LayoutConfig } from '~/types/route.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

// Memoize it so that default seo never overrides page seo
const MemoizedDefaultSeo = memo(DefaultSeo);

export function AppProvider(props: Props) {
  const { layoutConfig, children } = props;

  useBodyBgColor(layoutConfig?.bodyBgColor);

  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <SnackbarProvider
          disableWindowBlurListener
          preventDuplicate
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          maxSnack={3}
        >
          <MemoizedDefaultSeo />
          {children}
        </SnackbarProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}
