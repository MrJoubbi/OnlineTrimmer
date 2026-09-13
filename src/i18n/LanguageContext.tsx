import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption } from './types';
import { TRANSLATIONS, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  dir: 'ltr' | 'rtl';
  t: (key: keyof TranslationDictionary) => string;
  currentOption: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'onlinetrimmer_lang';

function detectDefaultLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  // 1. Check URL query params first (e.g. ?lang=ar or ?lang=fr)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang')?.toLowerCase();
  if (langParam && ['en', 'fr', 'ar', 'ru'].includes(langParam)) {
    return langParam as SupportedLanguage;
  }

  // 2. Check localStorage
  const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
  if (saved && ['en', 'fr', 'ar', 'ru'].includes(saved)) {
    return saved;
  }

  // 3. Detect from user's browser language list
  const browserLanguages = navigator.languages || [navigator.language || ''];
  for (const bl of browserLanguages) {
    const code = bl.toLowerCase();
    if (code.startsWith('ar')) return 'ar';
    if (code.startsWith('fr')) return 'fr';
    if (code.startsWith('ru')) return 'ru';
    if (code.startsWith('en')) return 'en';
  }

  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => detectDefaultLanguage());

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const dir = currentOption.dir;

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  };

  useEffect(() => {
    // Update HTML attributes for language and text direction
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;

      // Also adjust meta tags or class if helpful
      if (dir === 'rtl') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [language, dir]);

  const t = (key: keyof TranslationDictionary): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return TRANSLATIONS.en[key] || (key as string);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        t,
        currentOption,
        availableLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
