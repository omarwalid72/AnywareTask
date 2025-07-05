import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';

// Import translation files
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// RTL languages
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Get device language
const deviceLanguage = getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage,
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    // React Native specific configuration
    compatibilityJSON: 'v4',
    
    // Enable debug mode in development
    debug:false,
  });

// Handle RTL layout changes
i18n.on('languageChanged', (lng) => {
  const isRTL = rtlLanguages.includes(lng);
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
});

// Set initial RTL state
const isRTL = rtlLanguages.includes(i18n.language);
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
