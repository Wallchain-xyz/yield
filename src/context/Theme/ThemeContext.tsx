'use client';

import { CssBaseline } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren, ReactNode } from 'react';

import { lightPalette } from '../../../.storybook/palettes/lightPalette';
import { useDevicePlatform } from '../PlatformContext/PlatformContext';

import { createTheme } from './createTheme';
import { Platform, ThemeParams } from './types';

type DumbThemeProviderProps = {
  children: ReactNode;
  platform: Platform;
  tgPalette: ThemeParams;
};

const ThemeProvider = dynamic(() =>
  import('@mui/material').then(({ ThemeProvider: $ThemeProvider }) => $ThemeProvider),
);

export function DumbThemeProvider({ children, platform, tgPalette }: DumbThemeProviderProps) {
  const theme = createTheme(tgPalette, platform);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}

export function WalletThemeProvider({ children }: PropsWithChildren) {
  const platform = useDevicePlatform();
  const palette = lightPalette.colors;

  return (
    palette && (
      <DumbThemeProvider platform={platform} tgPalette={palette}>
        {children}
      </DumbThemeProvider>
    )
  );
}
