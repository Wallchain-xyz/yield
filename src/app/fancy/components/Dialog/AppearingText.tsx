/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { assertNever } from '@/lib/utils/assertNever';
import { wait } from '@/lib/utils/wait';

import styles from './Dialog.module.css';

interface ComponentItem {
  type: 'string' | 'newline' | 'space';
  value: string;
  link?: string;
}

function tokenToTokenType(token: string): ComponentItem['type'] {
  switch (token) {
    case ' ':
      return 'space';
    case '\n':
      return 'newline';
    default:
      return 'string';
  }
}

function mapTokensToJSX(component: ComponentItem, index: number) {
  switch (component.type) {
    case 'string':
      return <span key={index}>{component.value}</span>;
    case 'newline':
      return <br key={index} />;
    case 'space':
      return <span key={index}> </span>;
    default:
      return assertNever(component.type);
  }
}

function buildTokens(tokens: string[], activatedTokens: number) {
  const componentsList: ComponentItem[] = [];
  let currentComponent: ComponentItem | undefined;

  for (let i = 0; i < activatedTokens; i++) {
    const token = tokens[i];
    const tokenType = tokenToTokenType(token);
    if (currentComponent && currentComponent?.type !== tokenType) {
      componentsList.push(currentComponent);
      currentComponent = undefined;
    }
    if (!currentComponent) {
      currentComponent = { type: tokenType, value: '' };
    }
    if (tokenType === 'string') {
      currentComponent!.value += token;
    }
    if (currentComponent.type === 'space' || currentComponent.type === 'newline') {
      componentsList.push(currentComponent);
      currentComponent = undefined;
    }
  }

  if (currentComponent) {
    componentsList.push(currentComponent);
  }

  return componentsList.map(mapTokensToJSX);
}

function tokenizeText(text: string) {
  const currentText = text.split('\n').map(line => line.split(' '));
  const tmp: string[] = [];
  for (let line = 0; line < currentText.length; line++) {
    const tmpLine: string[] = currentText[line];
    for (let word = 0; word < tmpLine.length; word++) {
      const postfix = word === tmpLine.length - 1 ? '' : ' ';
      tmp.push(...tmpLine[word], postfix);
    }
    tmp.push('\n');
  }
  return tmp;
}

export function AppearingText({ text, onFinished }: { text: string; onFinished?: (text: string) => void }) {
  const [tokens, setTokens] = useState<string[]>([]);
  const [activatedTokens, setActivatedTokens] = useState<number>(0);
  const forceFinish = useRef<boolean>(false);

  if (forceFinish.current) {
    forceFinish.current = false;
    setActivatedTokens(tokens.length - 1);
  }

  // creates token lists
  useEffect(() => {
    setActivatedTokens(0);
    setTokens(tokenizeText(text));
  }, [text]);

  // activates tokens
  useEffect(() => {
    (async () => {
      await wait(35);
      const isLastToken = activatedTokens === tokens.length - 1;

      if (!isLastToken) setActivatedTokens(activatedTokens + 1);
      if (isLastToken && onFinished) onFinished(text);
    })();
  }, [tokens, activatedTokens, onFinished, text]);

  const onForceFinish: MouseEventHandler<HTMLSpanElement> = useCallback(() => {
    forceFinish.current = true;
  }, []);

  return (
    <span className={styles.appearingText} onClick={onForceFinish}>
      {buildTokens(tokens, activatedTokens)}
    </span>
  );
}
