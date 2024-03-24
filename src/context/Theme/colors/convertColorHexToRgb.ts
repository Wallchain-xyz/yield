import { HexColor } from '@/context/Theme/colors/HexColor';

const modifyHex = (hex: string) => {
  if (hex.length === 4) {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line no-param-reassign
    hex = hex.replace('#', '');
  }
  if (hex.length === 3) {
    const [r, g, b] = hex;
    return `${r}${r}${g}${g}${b}${b}`;
  }
  return hex;
};

export const convertColorHexToRgb = (color: HexColor): { r: number; g: number; b: number } => {
  if (!color.includes('#')) {
    throw new Error('Function supports only hex color format');
  }

  let hexColor = color.replace('#', '');

  if (hexColor.length !== 6) {
    hexColor = modifyHex(hexColor);
  }

  return {
    r: parseInt(hexColor.slice(0, 2), 16),
    g: parseInt(hexColor.slice(2, 4), 16),
    b: parseInt(hexColor.slice(4, 6), 16),
  };
};
