import React from 'react';
import LibraryForm from '../../components/LibraryForm';
import styles from './LibraryPage.module.scss';

export default function LibraryPage() {
  return (
    <div className={styles.wrapper}>
      <LibraryForm />
    </div>
  );
}
