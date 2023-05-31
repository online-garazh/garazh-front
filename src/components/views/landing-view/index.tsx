import Box from '@mui/material/Box';

import { ButtonUp } from '~/components/common/button-up';
import { AboutSection } from '~/components/views/landing-view/about-section';
import { HeroSection } from '~/components/views/landing-view/hero-section';

export function LandingView() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100vw',
      }}
    >
      <HeroSection />
      <AboutSection />

      <Box
        sx={({ spacing }) => ({
          position: 'fixed',
          bottom: spacing(3),
          zIndex: 100,
          right: spacing(3),
        })}
      >
        <ButtonUp />
      </Box>
    </Box>
  );
}
