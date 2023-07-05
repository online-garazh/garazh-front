import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { SnackbarProvider } from 'notistack';
import { type ReactNode } from 'react';

import { ErrorBoundary } from '~/components/common/error-boundary';
import { useBodyBgColor } from '~/hooks/use-body-bg-color.hook';
import { type LayoutConfig } from '~/types/route.type';

type Props = {
  layoutConfig?: LayoutConfig;
  children: ReactNode;
};

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
          {children}
        </SnackbarProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}
