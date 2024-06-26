export interface Discount {
  id: number;
  code: string;
  from: string;
  to: string;
  subcategory: number;
  percentage: number;
  value?:number
}

export interface DiscountsRequest {
  code: string;
  from: string;
  to: string;
  subcategory: number;
  percentage: number;
  value?:number;
}

export interface DiscountsResponse {
  data: Discount[];
  path: string;
  duration: string;
  method: string;
}

export interface SingleDiscountResponse {
  data: Discount;
}