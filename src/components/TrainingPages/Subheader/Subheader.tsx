import React from 'react';
import styles from './Subheader.module.scss';

interface Props {
  title: string;
}

export default function Subheader({ title }: Props) {
  return (
    <div className={styles.subheader}>
      <div className={styles.subheaderText}>
        {title}
      </div>
    </div>
  );
}