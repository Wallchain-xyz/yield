import { describe, expect, it } from 'vitest';

import { HexColor } from '@/context/Theme/colors/HexColor';

import { convertColorHexToRgb } from './convertColorHexToRgb';

describe('convertColorHexToRgb', () => {
  it('convert hex color to rgb format', () => {
    const hexColor = '#ffffff';
    const { r, g, b } = convertColorHexToRgb(hexColor);
    const rgbColor = `rgb(${r},${g},${b})`;
    expect(rgbColor).toBe('rgb(255,255,255)');
  });

  it('convert short form of hex color to rgb format', () => {
    const hexColor = '#fff';
    const { r, g, b } = convertColorHexToRgb(hexColor);
    const rgbColor = `rgb(${r},${g},${b})`;
    expect(rgbColor).toBe('rgb(255,255,255)');
  });

  it('convert native browser color format to rgb that should fail', () => {
    const hexColor = 'violet';
    expect(() => convertColorHexToRgb(hexColor as HexColor)).toThrowError('Function supports only hex color format');
  });
});
