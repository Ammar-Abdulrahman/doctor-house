export interface Operator {
  id: number;
  username: string;
  isActive: boolean;
  type: string;
  fullName: string;
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
