import { assertNever } from '@/lib/utils/assertNever';

const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;
const rgbRegex = /^rgb\( *(\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *\)$/i;
const rgbaRegex = /^rgba\( *(\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *((1)|(0)|(0\.\d{1,3})) *\)$/i;
const getCoding = (color: string) => {
  if (hexRegex.test(color)) return 'hex';
  if (rgbRegex.test(color)) return 'rgb';
  if (rgbaRegex.test(color)) return 'rgba';

  throw new Error('Invalid color');
};
const applyOpacityToRGB = (color: string, opacity: number) => {
  const [r, g, b] = color.slice(4, -1).split(',');

  return `rgba(${r},${g},${b},${opacity})`;
};
const applyOpacityToRGBA = (color: string, opacity: number) => {
  const [r, g, b] = color.slice(5, -1).split(',');

  return `rgba(${r},${g},${b},${opacity})`;
};
const applyOpacityToHex = (color: string, opacity: number) => {
  const withoutHash = color.slice(1);
  const [r, g, b] = withoutHash.length === 3 ? withoutHash.split('') : (withoutHash.match(/.{2}/g) as string[]);
  return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},${opacity})`;
};

export function applyOpacityToColor(color: string, opacity: number) {
  if (opacity < 0 || opacity > 1) {
    throw new Error('Invalid opacity value');
  }
  const coding = getCoding(color);

  switch (coding) {
    case 'hex':
      return applyOpacityToHex(color, opacity);
    case 'rgb':
      return applyOpacityToRGB(color, opacity);
    case 'rgba':
      return applyOpacityToRGBA(color, opacity);
    default:
      return assertNever(coding);
  }
}
