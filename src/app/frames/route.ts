/* eslint-disable import/no-unused-modules */
import { FrameVersion, ImageAspectRatio, getFrameHtml, validateFrameMessage } from 'frames.js';

import { Automaton } from './automaton';

const imageUrlBase = `${process.env.NEXT_PUBLIC_HOST}/api/frame-image.png`;

const redirectScript = `<script>window.location.href = window.location.origin + "/conventional/fancy";</script>`;

export async function GET() {
  const automaton = new Automaton('');
  const nextState = automaton.stringify();

  const imageURL = new URL(imageUrlBase);
  imageURL.searchParams.set('state', nextState);
  const frame = {
    version: 'vNext' as FrameVersion,
    image: imageURL.toString(),
    ...automaton.controls,
    ogImage: imageURL.toString(),
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
    imageAspectRatio: '1:1' as ImageAspectRatio,
    state: nextState,
  };

  const html = getFrameHtml(frame);
  return new Response(redirectScript + html, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { isValid, message } = await validateFrameMessage(body);

  if (!isValid || !message || !message.data.fid) {
    return new Response('Invalid message', { status: 400 });
  }

  const inputText = new TextDecoder().decode(message.data.frameActionBody.inputText);
  const state = decodeURI(new TextDecoder().decode(message.data.frameActionBody.state));
  const { buttonIndex } = message.data.frameActionBody;

  const automaton = new Automaton(state);
  await automaton.changeState(buttonIndex, inputText);
  const nextState = automaton.stringify();

  const imageURL = new URL(imageUrlBase);
  imageURL.searchParams.set('state', nextState);

  const frame = {
    version: 'vNext' as FrameVersion,
    image: imageURL.toString(),
    ...automaton.controls,
    ogImage: imageURL.toString(),
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
    imageAspectRatio: '1:1' as ImageAspectRatio,
    state: nextState,
  };

  const html = getFrameHtml(frame);

  return new Response(redirectScript + html, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}
