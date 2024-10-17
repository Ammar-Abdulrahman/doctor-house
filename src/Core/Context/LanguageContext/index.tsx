import { createContext, useState, useContext, useEffect } from "react";
import i18n from "@Localization/index"; // Import the i18next instance

// Define the context
const LocaleContext = createContext(undefined);

// Locale provider with language switching logic
export const LanguageAppProvider = ({ children }) => {
  //const [locale, setLocale] = useState(i18n.language); // Default to i18n's current language
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || i18n.language
  );

  useEffect(() => {
    i18n.changeLanguage(locale); // Sync i18n with state
    localStorage.setItem("locale", locale);
  }, [locale]);

  const switchLanguage = (lang: any) => {
    setLocale(lang); // Update locale in state
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to use LocaleContext
export const useLocale = () => useContext(LocaleContext);
