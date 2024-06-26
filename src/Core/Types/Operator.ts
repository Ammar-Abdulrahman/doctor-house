export interface Operator {
  id: number;
  username: string;
  isActive: boolean;
  type: string;
  fullName: string;
  role: {
    id: string;
    name: {
      ar: string;
      en: string;
    };
  };
}

export interface OperatorRequest {
  username: string;
  fullName: string;
  password: number;
  role: number;
}

export interface OperatorResponse {
  data: Operator[];
  path: string;
  duration: string;
  method: string;
}

export interface SingleOperatorResponse {
  data: Operator;
}