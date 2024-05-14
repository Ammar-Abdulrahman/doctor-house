import axiosInstance from "@Constants/Shared";

interface LoginResponse {
  data: {
    user?: {
      username?: string;
      role?: {
        id: number;
        role?: string;
        privileges?: string[];
      };
      [key: string]: any;
    };
    accessToken: string;
  };
}

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
