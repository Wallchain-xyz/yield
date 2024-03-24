import classNames from 'classnames';
import { Inter, Roboto_Mono as RobotoMono } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';

import { AnalyticsProvider } from '@/context/Analytics/AnalyticsContext';

import { PlatformProvider } from '@/context/PlatformContext/PlatformContext';
import { WalletThemeProvider } from '@/context/Theme/ThemeContext';

import type { Metadata } from 'next';
import './globals.css';

const robotoMono = RobotoMono({
  subsets: ['latin'],
  variable: '--theme-mono-font',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--theme-main-font',
});

const optionalChainingChecker = `
try {
  eval('const foo = {}; foo?.bar');
} catch {
  window.location.pathname = '/unsupported.html';
}
`;

export const metadata: Metadata = {
  title: 'Yield Master',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, `${inter.variable} ${robotoMono.variable}`)}>
        <Script strategy="beforeInteractive" id="optionalChainingCheckerScript">
          {optionalChainingChecker}
        </Script>
        <AnalyticsProvider>
          <PlatformProvider>
            <WalletThemeProvider>{children}</WalletThemeProvider>
          </PlatformProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
