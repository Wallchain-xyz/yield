/* eslint-disable import/no-default-export */
/* eslint-disable import/no-unused-modules */

// Simple probe

export function GET() {
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
