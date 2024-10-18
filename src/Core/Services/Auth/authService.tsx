import axiosInstance from "@Constants/Config";
import { LoginResponse } from "@Types/Login";

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};
