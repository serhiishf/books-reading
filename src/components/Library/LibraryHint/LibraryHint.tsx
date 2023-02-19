import React from 'react';
import styles from './LibraryHint.module.scss';
import { ReactComponent as Flag } from '../../../assets/img/flag.svg';
import { ReactComponent as Arr } from '../../../assets/img/ancle-arr.svg';
import { ReactComponent as Book } from '../../../assets/img/book.svg';

export default function LibraryHint() {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.item}>
          <h3 className={styles.title}>Step 1</h3>
          <div className={styles.blockTitle}>
            <Book className={styles.icon} />
            <h4 className={styles.subtitle}>Create your own library</h4>
          </div>
          <div className={styles.blockText}>
            <Arr />
            <span className={styles.text}>
              Add there books which you are going to read.
            </span>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>Step 2</h3>
          <div className={styles.blockTitle}>
            <Flag className={styles.icon} />
            <h4 className={styles.subtitle}>Create your first training</h4>
          </div>
          <div className={styles.blockText}>
            <Arr />
            <span className={styles.text}>
              Set a goal, choose period, start training.
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
