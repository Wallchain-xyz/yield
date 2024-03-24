'use client';

import { Button, Stack, Typography, useTheme } from '@mui/material';
import { captureException } from '@sentry/nextjs';
import { useEffect } from 'react';

import { ErrorScreenGraphics } from './ErrorScreenGraphics';

interface ErrorScreenProps {
  error: Error;
  reset: () => void;
}

export function ErrorScreen({ error, reset }: ErrorScreenProps) {
  const theme = useTheme();
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <Stack alignItems="center" sx={{ height: '100%' }} spacing={2}>
      <ErrorScreenGraphics />
      <Stack alignItems="center" spacing={1}>
        <Typography
          sx={{
            fontSize: theme.typography.pxToRem(26),
            lineHeight: theme.typography.pxToRem(26),
            fontWeight: 700,
          }}
          component="span"
          textAlign="center"
          color="text.secondary"
        >
          Oops
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.pxToRem(18),
            lineHeight: theme.typography.pxToRem(20),
            fontWeight: 600,
          }}
          component="span"
          textAlign="center"
          color="text.secondary"
        >
          Something went wrong
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          fontSize: theme.typography.pxToRem(16),
          borderRadius: theme.spacing(2.25),
          px: theme.spacing(2),
        }}
        size="small"
        type="button"
        onClick={reset}
      >
        Try again
      </Button>
    </Stack>
  );
}
