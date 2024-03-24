import { describe, expect, it } from 'vitest';

import { applyOpacityToColor } from './applyOpacityToColor';

describe('applyOpacityToColor', () => {
  it('should handle rgb', () => {
    expect(applyOpacityToColor('rgb(0,0,0)', 0.5)).toBe(`rgba(0,0,0,0.5)`);
    expect(applyOpacityToColor('rgba(0,0,0,0.75)', 0.5)).toBe(`rgba(0,0,0,0.5)`);
  });
  it('should handle hex', () => {
    expect(applyOpacityToColor('#000000', 0.5)).toBe(`rgba(0,0,0,0.5)`);
    expect(applyOpacityToColor('#000', 0.5)).toBe(`rgba(0,0,0,0.5)`);
  });
  it('should throw an error if color or opacity is invalid', () => {
    expect(() => applyOpacityToColor('rgb(0,0,0)', 1.5)).toThrowError();
    expect(() => applyOpacityToColor('#zoo', 0.5)).toThrowError();
  });
});
