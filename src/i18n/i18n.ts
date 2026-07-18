import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

const RTL_LANGUAGES = ['ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

// Keep <html lang> and dir in sync
i18n.on('languageChanged', (lng) => {
  const langCode = lng.substring(0, 2);
  document.documentElement.setAttribute('lang', langCode);
  document.documentElement.setAttribute('dir', RTL_LANGUAGES.includes(langCode) ? 'rtl' : 'ltr');
});

// Set initial lang & dir attributes
const initialLang = (i18n.language || 'en').substring(0, 2);
document.documentElement.setAttribute('lang', initialLang);
document.documentElement.setAttribute('dir', RTL_LANGUAGES.includes(initialLang) ? 'rtl' : 'ltr');

export default i18n;
