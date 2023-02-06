import React from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.scss';


export default function LoginPage() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <LoginForm />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.quoteSign}>&ldquo;</div>
        <p className={styles.quoteText}>
          Books are the ships of thoughts,
          <br /> wandering through the waves
          <br /> of time.
        </p>
        <p className={styles.quoteAuthor}> Francis Bacon </p>
      </div>
    </div>
  );
}
