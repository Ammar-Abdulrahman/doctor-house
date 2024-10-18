import { loginApi } from "@Services/Auth/authService";
import React, { useState, useMemo } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { useLocale } from "@Context/LanguageContext";
import { loginSuccess } from "@Store/Slices/authSlice";
import { useDispatch } from "react-redux";

export const useAuthenticationContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      dispatch(
        loginSuccess({
          token: accessToken,
          privileges: user?.role?.privileges || [],
        })
      );
      navigate("/");
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
