import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

export const LandingLayoutFooter = memo(function LandingLayoutFooterBase() {
  return (
    <Box component="footer" sx={{ minHeight: 160 }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="body1">Footer</Typography>
      </Container>
    </Box>
  );
});
