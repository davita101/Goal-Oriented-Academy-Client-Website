import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ka from './ka.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      ka: {
        translation: ka
      }
    },
    lng: localStorage.getItem("i18nextLng") || "ka", // set default language to ka
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;