export interface Order {
  id: number;
  status: string;
  user: {
    id: number;
    name: string;
  };
  date: Date;
  deliverOption: string;
  totalPrice?: number;
  discount?: number;
  freeDeliveryArea?: {
    area: string;
    time: string;
  };
}

export interface OrdersResponse {
  data: Order[];
  path: string;
  duration: string;
  method: string;
}

export interface SingleOrderResponse {
  data: Order;
}
