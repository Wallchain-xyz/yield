/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useState } from 'react';

import { checkProfits } from '@/lib/checkProfits';
import { isAddress } from '@/lib/utils/isAddress';
import { wait } from '@/lib/utils/wait';

import { AppearingText } from './AppearingText';
import styles from './Dialog.module.css';
import { invitationText, notAnAddress, nothingTemplate, successTemplate } from './textTemplates';

export function Dialog() {
  const [text, setText] = useState<string>(invitationText);
  const [textFinished, setTextFinished] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = async () => {
    setTextFinished(false);
    setInputValue('');
    setText('');

    await wait(200);

    if (!isAddress(inputValue)) {
      setText(notAnAddress);
      return;
    }

    setText('Searching...');

    await wait(3000);

    const { found, data } = await checkProfits(inputValue);
    if (!found) {
      setText(nothingTemplate);
    } else {
      setText(successTemplate(data));
    }
  };

  const finishHandler = useCallback(async (text: string) => {
    if (text !== 'Searching...' && text !== '') {
      await wait(200);
      setTextFinished(true);
    }
  }, []);

  return (
    <div className={styles.dialogContainer}>
      <AppearingText text={text} onFinished={finishHandler} />
      {textFinished && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button className={styles.searchButton} onClick={handleSearch} type="button">
            Lookup
          </button>
        </div>
      )}
    </div>
  );
}
