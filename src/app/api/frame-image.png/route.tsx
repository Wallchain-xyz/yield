/* eslint-disable consistent-return */
/* eslint-disable import/no-default-export */
/* eslint-disable import/no-unused-modules */
import { ImageResponse } from '@vercel/og';

import { Scene } from '@/app/components/frameComponents/Scene';

import { TextBox } from '@/app/components/frameComponents/TextBox';

import { stateToText } from '@/app/components/frameComponents/textTemplates';

export async function GET(req: Request) {
  if (!req.url) {
    return Response.error();
  }

  const state = JSON.parse(decodeURI(new URL(req.url).searchParams.get('state') as string));

  const imageResponse = new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative' }}>
        <Scene />
        <TextBox>{stateToText(state)}</TextBox>
      </div>
    ),
    {
      width: 1146,
      height: 1146,
    },
  );

  const arrayBuffer = await imageResponse.arrayBuffer();
  return new Response(arrayBuffer);
}
