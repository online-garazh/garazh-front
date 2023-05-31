import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function AboutSection() {
  return (
    <Box component="section" sx={{ minHeight: 560 }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ mb: 4 }}>
          About section
        </Typography>
      </Container>
    </Box>
  );
}
