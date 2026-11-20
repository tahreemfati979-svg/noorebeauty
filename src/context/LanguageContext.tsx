import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTranslations, TranslationDictionary } from '../i18n/translations';
import { Language } from '../types';

interface LanguageContextValue {
  language: Language;
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  formatPrice: (pkr: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'ln_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    const dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore storage failure
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en'));
  }, []);

  const formatPrice = useCallback((pkr: number) => {
    return `PKR ${Math.round(pkr).toLocaleString('en-US')}`;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isRtl: language === 'ur',
      setLanguage,
      toggleLanguage,
      t: getTranslations(language),
      formatPrice,
    }),
    [formatPrice, language, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
