import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import itTranslations from './locales/it.json';
import enTranslations from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      it: { translation: itTranslations },
    },
    fallbackLng: 'it', // Fallback to Italian if detection fails or language is not supported
    supportedLngs: ['it', 'en'],
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language.startsWith('en') ? 'en' : 'it';
});

export default i18n;
