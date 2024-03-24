import { captureMessage } from '@sentry/nextjs';

export function assertNever(value: never, noThrow = true): never {
  const message = `Unhandled discriminated union member: ${JSON.stringify(value)}`;
  if (noThrow) {
    captureMessage(message);
    return value;
  }

  throw new Error(message);
}
