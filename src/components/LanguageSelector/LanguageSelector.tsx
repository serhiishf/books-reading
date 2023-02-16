import React from 'react';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('LOCALE', lang);
  };
  return (
    <div className={styles.wrapper}>
      {i18n.languages.map((lang: string) => (
        <button
          className={`${styles.lang}  ${
            lang === i18n.language ? styles.active : ''
          }`}
          title={lang}
          onClick={() => changeLanguage(lang)}
          key={lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
