import { lightPalette } from '../../../../.storybook/palettes/lightPalette';

export function mapTgColorsToMUIColors(telegramThemeParams: (typeof lightPalette)['colors']) {
  // in designs called --tg-theme-button-color
  const primaryMainColor = telegramThemeParams.button_color as `#${string}`;
  // in designs called --tg-theme-text-color
  const primaryTextColor = telegramThemeParams.text_color as `#${string}`;
  // in designs called --tg-theme-bg-color
  const backgroundPaperColor = telegramThemeParams.bg_color as `#${string}`;
  // in designs called --tg-theme-button-text-color
  const primaryContrastTextColor = telegramThemeParams.button_text_color as `#${string}`;
  // in designs called --tg-theme-secondary-bg-color
  const secondaryMainColor = telegramThemeParams.secondary_bg_color as `#${string}`;
  // in designs called --tg-theme-hint-color
  const secondaryTextColor = telegramThemeParams.hint_color as `#${string}`;
  const errorMainColor = telegramThemeParams.destructive_text_color as `#${string}`;

  return {
    primaryMainColor,
    primaryTextColor,
    backgroundPaperColor,
    primaryContrastTextColor,
    secondaryMainColor,
    secondaryTextColor,
    errorMainColor,
  };
}
