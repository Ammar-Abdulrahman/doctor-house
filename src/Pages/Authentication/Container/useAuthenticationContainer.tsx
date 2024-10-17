import { loginApi } from "@Services/Authentications";
import React, { useState, useMemo } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { useLocale } from "@Context/LanguageContext";
import { loginSuccess } from "@Store/Slices/authSlice"; 

export const useAuthenticationContainer = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const cacheRtl = useMemo(() => {
    return createCache({
      key: locale === "ar" ? "muiltr" : "mui",
      stylisPlugins: locale === "ar" ? [prefixer, rtlPlugin] : [],
    });
  }, [locale]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation(() => loginApi(username, password), {
    onSuccess: (data) => {
      const { accessToken, user } = data.data;
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem(
        "privileges",
        JSON.stringify(user?.role?.privileges)
      );
      navigate("/");
      console.log(data.data.accessToken);
      console.log(data.data?.user?.role?.privileges);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    cacheRtl,
    togglePasswordVisibility,
    mutation,
    handleSubmit,
  };
};

export default useAuthenticationContainer;
