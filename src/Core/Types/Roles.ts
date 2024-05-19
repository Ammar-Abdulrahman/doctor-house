export interface Role {
  id: number;
  name: {
    ar: string;
    en: string;
  };
}

export interface RoleRequest {
  name: {
    ar: string;
    en: string;
  };
  privileges: number[];
}

export interface RoleResponse {
  data: Role[];
}
