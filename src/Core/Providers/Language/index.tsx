// src/providers/AppProviders.tsx

import React from "react";
import { LanguageAppProvider } from "@Context/LanguageContext";
import "@Localization/index";

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <LanguageAppProvider>{children}</LanguageAppProvider>;
};

export default LanguageProvider;
