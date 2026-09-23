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

  // 0. Check URL pathname prefix (e.g. /ru/ or /ru)
  if (window.location.pathname.startsWith('/ru/') || window.location.pathname === '/ru') {
    return 'ru';
  }

  const validCodes = new Set<string>(SUPPORTED_LANGUAGES.map((l) => l.code.toLowerCase()));

  // 1. Check URL query params first (e.g. ?lang=hi or ?lang=es)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang')?.toLowerCase();
  if (langParam) {
    const match = SUPPORTED_LANGUAGES.find(
      (l) => l.code.toLowerCase() === langParam
    );
    if (match) return match.code;
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY)?.toLowerCase();
    if (saved) {
      const match = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === saved);
      if (match) return match.code;
    }
  } catch {
    // Ignore localStorage errors in sandboxed iframes
  }

  // 3. Detect from user's browser language list
  const browserLanguages = navigator.languages || [navigator.language || ''];
  for (const bl of browserLanguages) {
    if (!bl) continue;
    const lower = bl.toLowerCase();

    // Exact match first (e.g. 'zh-tw')
    const exactMatch = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === lower);
    if (exactMatch) return exactMatch.code;

    // Base language match (e.g. 'es-419' -> 'es', 'pt-BR' -> 'pt', 'de-DE' -> 'de')
    const baseCode = lower.split('-')[0];
    const baseMatch = SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === baseCode);
    if (baseMatch) return baseMatch.code;
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
