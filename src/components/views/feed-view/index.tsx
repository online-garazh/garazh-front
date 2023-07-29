import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Post } from '~/components/common/post';

export function FeedView() {
  return (
    <Box sx={{ width: '100%', pt: '30px' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Стрічка
      </Typography>

      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr' }}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Box>
    </Box>
  );
}
