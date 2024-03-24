import { lightPalette } from '../../../.storybook/palettes/lightPalette';

export type Platform = 'iOS' | 'Android';

export type ThemeParams = (typeof lightPalette)['colors'];
