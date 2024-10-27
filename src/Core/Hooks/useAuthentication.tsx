import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@Services/Auth/authService";
import { loginSuccess, logout } from "@Store/Slices/authSlice";
import { persistor } from "Core/store";
import { ErrorProps } from "@Types/ErrorProps";
import { toast } from "react-toastify";

const useAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const HandleLogin = useMutation(() => loginApi(username, password), {
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
    onError(error: ErrorProps) {
      toast.error(`Error :${error?.response.data.error.message}`, {
        autoClose: false,
      });
    },
  });

  const HandleLogout = (onClose: any) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(logout());
      persistor.purge();
      setIsLoading(false);
      onClose();
      navigate("/login");
    }, 2000);
  };

  return {
    HandleLogin,
    HandleLogout,
    isLoading,
    setIsLoading,
    password,
    setPassword,
    username,
    setUsername,
  };
};

export default useAuthentication;
