import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function ProfileView() {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Profile
      </Typography>
    </Box>
  );
}
