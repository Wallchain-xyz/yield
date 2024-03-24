import { PropsWithChildren } from 'react';

import { SWRConfig } from 'swr';

import { FakeAnalyticsProvider } from '@/context/Analytics/AnalyticsContext';

export function CommonProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <FakeAnalyticsProvider>{children}</FakeAnalyticsProvider>
    </SWRConfig>
  );
}
