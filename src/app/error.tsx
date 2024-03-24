'use client';

import { ErrorScreen } from '@/app/components/ErrorScreen/ErrorScreen';

interface AppErrorScreenProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppErrorScreen(props: AppErrorScreenProps) {
  return <ErrorScreen {...props} />;
}
