import React from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.scss';
import getRandomNum from '../../services/getRandomNum';
import { useTranslation } from 'react-i18next';

export interface QuoteI {
  text: string;
  author: string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const randomIndex = getRandomNum(0, 11);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <LoginForm />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.quoteSign}>&ldquo;</div>
        <p className={styles.quoteText}>{t(`quotes.${randomIndex}.text`)}</p>
        <p className={styles.quoteAuthor}>
          {t(`quotes.${randomIndex}.author`)}
        </p>
      </div>
    </div>
  );
}
