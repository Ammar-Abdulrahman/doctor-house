// LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';
import i18n from '../../Localization';

// Define the context's shape
interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedLanguage = localStorage.getItem('language') || 'ar';

  // Ensure i18n is initialized with the stored language
  i18n.changeLanguage(storedLanguage);

  const [language, setLanguage] = useState<string>(storedLanguage);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change the i18n language
    localStorage.setItem('language', lng); // Persist the new language
    setLanguage(lng); // Update the state
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
