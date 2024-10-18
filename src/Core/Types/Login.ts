export interface LoginResponse {
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
