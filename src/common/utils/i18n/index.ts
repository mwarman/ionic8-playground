import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { StorageKey } from '../constants';

// translation resources
import en from './resources/en';
import es from './resources/es';
import fr from './resources/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // logging
    debug: true,

    // languages, namespaces, and resources
    supportedLngs: ['en', 'es', 'fr'],
    fallbackLng: 'en',
    ns: ['account', 'auth', 'common', 'home', 'user'],
    defaultNS: 'common',
    resources: { en, es, fr },

    // translation defaults
    interpolation: {
      escapeValue: false,
    },

    // plugin - language detector
    detection: {
      lookupLocalStorage: StorageKey.Language,
    },
  });

export default i18n;
