/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from 'classnames';
import { useLayoutEffect } from 'react';

import { Sakura } from './sakura';
import styles from './Scene.module.css';
import 'sakura-js/dist/sakura.min.css';

export function Scene() {
  useLayoutEffect(() => {
    // @ts-ignore
    // eslint-disable-next-line no-new
    new Sakura('.sakura');
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <img className={styles.backgroundImage} src="/static/bg.jpg" />
          <img className={styles.mascot} src="/static/mascot.png" />
        </div>
      </div>
      <div className={classNames('sakura', styles.sakura)} />
    </>
  );
}
