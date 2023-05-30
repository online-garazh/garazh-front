import { Box, CircularProgress, type SxProps, type Theme, type CircularProgressProps } from '@mui/material';

export type Props = CircularProgressProps & {
  loaderOuterSx?: SxProps<Theme>;
  disableShrink?: boolean;
};

export function Loader(props: Props) {
  const { disableShrink, loaderOuterSx, ...muiProps } = props;

  return (
    <Box sx={[{ display: 'flex' }, ...(Array.isArray(loaderOuterSx) ? loaderOuterSx : [loaderOuterSx])]}>
      <CircularProgress color="secondary" disableShrink={disableShrink} {...muiProps} />
    </Box>
  );
}
