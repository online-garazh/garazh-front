import Box from '@mui/material/Box';

type Props = {
  testProp?: number;
};

export function ComponentTemplate(props: Props) {
  const { testProp } = props;

  console.debug('testProp', testProp);

  return <Box sx={{ width: '100%' }}>Function component template</Box>;
}
