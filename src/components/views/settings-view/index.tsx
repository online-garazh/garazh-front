import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SettingsView() {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Settings
      </Typography>
    </Box>
  );
}
