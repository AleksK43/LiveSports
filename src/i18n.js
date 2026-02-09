import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importujemy JSON-y
import translationPL from './locales/pl.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';

const resources = {
  pl: { translation: translationPL },
  en: { translation: translationEN },
  es: { translation: translationES }
};

i18n
  .use(LanguageDetector) // Wykrywa język z przeglądarki/localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Domyślny, jeśli nie wykryto innego
    debug: false,
    interpolation: {
      escapeValue: false // React sam chroni przed XSS
    },
    detection: {
      order: ['localStorage', 'navigator'], // Najpierw sprawdź czy user coś już wybrał, potem język przeglądarki
      caches: ['localStorage'] // Zapisz wybór w localStorage
    }
  });

export default i18n;