
import React, { createContext, useContext } from 'react';
import { TRANSLATIONS } from '../constants';

export type Language = 'en';

interface LanguageContextType {
  lang: Language;
  t: (key: string) => any;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lang: Language = 'en';

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = TRANSLATIONS[lang];

    for (const key of keys) {
      if (!result || result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  const isRtl = false;

  return (
    <LanguageContext.Provider value={{ lang, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
