import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function HeroSection() {
  return (
    <Box component="section" sx={{ minHeight: 560 }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Hero section
        </Typography>
      </Container>
    </Box>
  );
}
