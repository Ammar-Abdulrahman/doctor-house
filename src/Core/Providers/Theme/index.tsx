// src/providers/AppProviders.tsx

import React from "react";
import { ThemeAppProvider } from "@Context/ThemeContext";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeAppProvider>{children}</ThemeAppProvider>;
};

export default ThemeProvider;
