import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationUA from './locales/ua/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: localStorage.getItem('LOCALE') || 'en',
    fallbackLng: ['ua', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
