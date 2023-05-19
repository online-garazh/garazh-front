import { darkPalette } from '@/themes/config/options/dark.palette';
import { lightPalette } from '@/themes/config/options/light.palette';
import { PaletteMode } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

export type Palette = Record<PaletteMode, PaletteOptions>;

const palette: Palette = {
  light: lightPalette,
  dark: darkPalette,
};

export default palette;
