import React from 'react';
import styles from './CountItem.module.scss';

interface CountItemProps {
  count: number;
  title: string;
  smaller?: boolean;
  highlight?: boolean;
}

export default function CountItem({ count, title, smaller = false, highlight = false }: CountItemProps) {

  return (
    <div className={styles.countItem}>
      <div className={styles.countBlock}>
        <div className={styles.counter}>
          {count}
        </div>
      </div>
      <div className={styles.countTitle}>
        {title}
      </div>
    </div >
  );
}