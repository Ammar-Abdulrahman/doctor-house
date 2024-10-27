import React, { useState, useMemo } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { useLocale } from "@Context/LanguageContext";
import useAuthentication from "@Hooks/useAuthentication";

export const useAuthenticationContainer = () => {
  const { locale } = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const { HandleLogin, username, setUsername, password, setPassword } =
    useAuthentication();

  const cacheRtl = useMemo(() => {
    return createCache({
      key: locale === "ar" ? "muiltr" : "mui",
      stylisPlugins: locale === "ar" ? [prefixer, rtlPlugin] : [],
    });
  }, [locale]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    HandleLogin.mutate();
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    cacheRtl,
    togglePasswordVisibility,
    HandleLogin,
    handleSubmit,
  };
};

export default useAuthenticationContainer;
