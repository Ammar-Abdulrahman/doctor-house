export interface Role {
    id: number;
    name:string;
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
  