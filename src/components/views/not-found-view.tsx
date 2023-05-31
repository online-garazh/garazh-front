import { Box, Container, Typography } from '@mui/material';

import { Button } from '~/components/common/button';
import { RoutePaths } from '~/constants/routes.constant';
import { UiILocators } from '~/constants/ui-locators.constant';

export function NotFoundView() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          display: 'flex',
        }}
      >
        <Typography component="h2" variant="h2" sx={{ mb: 3 }}>
          Not Found
        </Typography>

        <Button href={RoutePaths.FEED} id={UiILocators.BACK_TO_HOME_BUTTON}>
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
}
