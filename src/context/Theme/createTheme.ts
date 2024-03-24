import { createTheme as createMUITheme } from '@mui/material';

import { applyOpacityToColor } from '@/context/Theme/colors/applyOpacityToColor';

import { lightPalette } from '../../../.storybook/palettes/lightPalette';

import { createDerivedColorsFromMUI } from './colors/createDerivedColorsFromMUI';
import { mapTgColorsToMUIColors } from './colors/mapTgColorsToMUIColors';
import { getRestyledComponents } from './components';
import { Platform } from './types';

export const extractPlatformFromUserAgent = (): Platform => {
  if (/iPad|iPhone|Mac|iPod/.test(navigator.userAgent)) {
    return 'iOS';
  }
  return 'Android';
};

// TODO: probably we need to use https://mui.com/material-ui/experimental-api/css-theme-variables/overview/#mental-model
export const createTheme = (telegramThemeParams: (typeof lightPalette)['colors'], platform: Platform) => {
  const {
    primaryMainColor,
    primaryTextColor,
    backgroundPaperColor,
    primaryContrastTextColor,
    secondaryMainColor,
    secondaryTextColor,
    errorMainColor,
  } = mapTgColorsToMUIColors(telegramThemeParams);

  const {
    //
    secondaryLightColor,
    secondaryDarkColor,
    primaryLightColor,
    errorLightColor,
  } = createDerivedColorsFromMUI(
    secondaryMainColor,
    backgroundPaperColor,
    primaryMainColor,
    secondaryTextColor,
    errorMainColor,
  );

  return createMUITheme({
    breakpoints: {
      values: {
        // disable breakpoints for now because we don't have adaptive design
        xs: Infinity,
        sm: Infinity,
        md: Infinity,
        lg: Infinity,
        xl: Infinity,
      },
    },
    typography: {
      overline: {
        lineHeight: '1.5rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        lineHeight: '1.25rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '18px',
        lineHeight: '1.25rem',
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: '1.125rem',
      },
      caption: {
        fontSize: '0.875rem',
      },
      fontFamily: [
        'var(--theme-main-font)', // var set by next/fonts
        '-apple-system', // and fallback to system from the docs
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      text: {
        primary: primaryTextColor,
        secondary: secondaryTextColor,
        disabled: applyOpacityToColor(primaryTextColor, 1),
      },
      background: {
        paper: backgroundPaperColor,
        default: secondaryMainColor,
      },
      // button, chips etc colors:
      primary: {
        contrastText: primaryContrastTextColor,
        main: primaryMainColor,
        light: primaryLightColor,
      },
      secondary: {
        light: secondaryLightColor,
        main: secondaryMainColor,
        dark: secondaryDarkColor,
      },
      error: {
        main: errorMainColor,
        light: errorLightColor,
      },
      warning: {
        main: '#FF4545',
      },
      info: {
        main: backgroundPaperColor,
        contrastText: primaryTextColor,
      },
      success: {
        main: '#55BE61',
      },
    },
    components: getRestyledComponents(platform),
  });
};
