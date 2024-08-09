import { Privilege } from "./Privileges";

export interface Role {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  privileges?: Privilege[];
}

export interface RoleRequest {
  name: {
    ar: string;
    en: string;
  };
  privileges: Number[];
}

export interface RoleResponse {
  data: Role[];
}

export interface SingleRoleResponse {
  data: Role;
}