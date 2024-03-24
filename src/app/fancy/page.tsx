/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */

'use client';

import { Dialog } from './components/Dialog/Dialog';
import { Scene } from './components/Scene';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene />
      <Dialog />
    </main>
  );
}
