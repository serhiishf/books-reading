import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '../../components/RegisterForm';


export default function RegisterPage() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <RegisterForm />
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.title}>Books Reading</h2>
        <div className={styles.text}>
          <p className={styles.subTitle}>Will help you to</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Create your goal faster and proceed to read
            </li>
            <li className={styles.listItem}>
              Divide process proportionally for each day{' '}
            </li>
            <li className={styles.listItem}>Track your success</li>
          </ul>
        </div>
        <div className={styles.text}>
          <p className={styles.subTitle}>You may also</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Pose your own independent point of view
            </li>
            <li className={styles.listItem}>
              Improve your professional skills according to new knowledge
            </li>
            <li className={styles.listItem}>
              Become an interesting interlocutor
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
