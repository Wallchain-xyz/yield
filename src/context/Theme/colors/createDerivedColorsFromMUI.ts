import { HexColor } from '@/context/Theme/colors/HexColor';

import { convertColorHexToRgb } from './convertColorHexToRgb';
import { mixRgbaWithRgb } from './mixRgbaWithRgb';

function rgbObjectToRgb(rgbObject: { r: number; g: number; b: number }): string {
  return `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`;
}

function rgbObjectToRgba(rgbObject: { r: number; g: number; b: number }, alpha: number): string {
  return `rgba(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}, ${alpha})`;
}

export function createDerivedColorsFromMUI(
  secondaryMainColor: HexColor,
  backgroundPaperColor: HexColor,
  primaryMainColor: HexColor,
  secondaryTextColor: HexColor,
  errorColor: HexColor,
) {
  // ======================= CALCULATIONS  =======================
  const secondaryBackgroundColorRgbObject = convertColorHexToRgb(secondaryMainColor);
  const backgroundPaperColorRgbObject = convertColorHexToRgb(backgroundPaperColor);
  const buttonBackgroundColorRgbObject = convertColorHexToRgb(primaryMainColor);
  const hintTextColorRgbObject = convertColorHexToRgb(secondaryTextColor);
  const errorColorRgbObject = convertColorHexToRgb(errorColor);
  // ======================= OUR CUSTOM MIXES OF TG THEME COLORS =======================
  const { rgb: twoBackgroundsMix, rgbObject: twoBackgroundsMixRgbObject } = mixRgbaWithRgb(
    rgbObjectToRgba(backgroundPaperColorRgbObject, 0.5),
    rgbObjectToRgb(secondaryBackgroundColorRgbObject),
  );
  const { rgb: buttonBackgroundMix } = mixRgbaWithRgb(
    rgbObjectToRgba(buttonBackgroundColorRgbObject, 0.15),
    rgbObjectToRgb(twoBackgroundsMixRgbObject),
  );
  const { rgb: hintBackgroundMix } = mixRgbaWithRgb(
    rgbObjectToRgba(hintTextColorRgbObject, 0.2),
    rgbObjectToRgb(twoBackgroundsMixRgbObject),
  );
  const { rgb: errorBackgroundMix } = mixRgbaWithRgb(
    rgbObjectToRgba(errorColorRgbObject, 0.1),
    rgbObjectToRgb(twoBackgroundsMixRgbObject),
  );

  // ======================= OUR CUSTOM MIXES OF TG THEME COLORS TO MUI COLORS  =======================
  // in designs called --tg-theme-bg-50-color TODO: rename in design
  const secondaryLightColor = twoBackgroundsMix;
  // in designs called --tg-theme-20-hint-color TODO: rename in design
  const secondaryDarkColor = hintBackgroundMix;
  // in designs called --tg-theme-15-button-color TODO: rename in design
  const primaryLightColor = buttonBackgroundMix;
  const errorLightColor = errorBackgroundMix;

  return { secondaryLightColor, secondaryDarkColor, primaryLightColor, errorLightColor };
}
