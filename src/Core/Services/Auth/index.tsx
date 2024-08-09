// authService.ts
import { useMutation } from 'react-query';
import axiosInstance from '@Constants/Shared/index';

interface AuthResponse {
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const useLogin = () => useMutation<AuthResponse, Error, LoginCredentials>(
  (credentials) => axiosInstance.post('/auth/login', credentials),
  {
    onSuccess: (data) => {
      //setAuthToken(data.token);
    },
  }
);

// export const useLogout = () => useMutation<void, Error>(
//   () => axiosInstance.post('/auth/logout'),
//   {
//     onSuccess: () => {
//       setAuthToken(null);
//     },
//   }
// );
