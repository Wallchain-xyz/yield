'use client';

import { ErrorScreen } from '@/app/components/ErrorScreen/ErrorScreen';

interface GlobalErrorScreenProps {
  error: Error;
  reset: () => void;
}

export default function GlobalErrorScreen(props: GlobalErrorScreenProps) {
  return (
    <html lang="en">
      <body>
        <ErrorScreen {...props} />;
      </body>
    </html>
  );
}
