export interface Privilege {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  key: string;
}

export interface PrivilegeResponse {
  data: Privilege[];
}
