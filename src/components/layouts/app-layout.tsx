import { useTheme } from '@mui/material/styles';
import NextProgress from 'next-progress';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function AppLayout(props: Props) {
  const { children } = props;
  const { palette } = useTheme();

  return (
    <>
      <NextProgress delay={200} options={{ showSpinner: false }} color={palette.secondary.main} />
      {children}
    </>
  );
}
