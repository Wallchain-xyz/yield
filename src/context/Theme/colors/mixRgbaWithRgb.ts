export function mixRgbaWithRgb(color: string, background: string) {
  const backgroundColor = background.match(/rgb\((-?\d{1,3}),\s*(-?\d{1,3}),\s*(-?\d{1,3})\)/);
  const mainColor = color.match(/rgba\((-?\d{1,3}),\s*(-?\d{1,3}),\s*(-?\d{1,3}),\s*([0-1]?(?:\.\d+)?)\)/);

  if (backgroundColor === null || backgroundColor.length !== 4) {
    throw new Error(`rgba-to-rgb: background should be in 'rgb(r, g, b)' format, got '${background}'.`);
  }

  if (mainColor === null || mainColor.length !== 5) {
    throw new Error(`rgba-to-rgb: color should be in 'rgba(r, g, b, a)' format, got '${color}'.`);
  }

  const [, bRed, bGreen, bBlue] = backgroundColor;
  const [, cRed, cGreen, cBlue, cAlpha] = mainColor;

  const red = (1 - +cAlpha) * +bRed + +cAlpha * +cRed;
  const green = (1 - +cAlpha) * +bGreen + +cAlpha * +cGreen;
  const blue = (1 - +cAlpha) * +bBlue + +cAlpha * +cBlue;

  const r = Math.round(red);
  const g = Math.round(green);
  const b = Math.round(blue);
  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgbObject: {
      r,
      g,
      b,
    },
  };
}
