'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

import { extractPlatformFromUserAgent } from '../Theme/createTheme';
import { Platform } from '../Theme/types';

export const PlatformContext = createContext<Platform | null>(null);

const usePlatformContext = () => {
  const platformContext = useContext(PlatformContext);

  if (!platformContext) {
    throw new Error('usePlatformContext must be used within a PlatformProvider');
  }

  return platformContext;
};

export const useDevicePlatform = () => {
  const platform = usePlatformContext();

  return platform;
};

export function PlatformProvider({ children }: PropsWithChildren) {
  const platform = extractPlatformFromUserAgent();

  return <PlatformContext.Provider value={platform}>{children}</PlatformContext.Provider>;
}
