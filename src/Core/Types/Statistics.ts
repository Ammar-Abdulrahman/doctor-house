export interface ActiveUsersResponse {
  data: {
    count: number;
  };
}

export interface TotalRevenueResponse {
  data: {
    total: number;
  };
}

export interface TopThreeBuyersResponse {
  data: {
    buyers: Array<{ user: string; total: number }>;
  };
}

export interface OrdersOvertimeResponse {
  data: {
    data: Array<{
      year: string;
      data: Array<{
        name: string;
        data: number[];
      }>;
    }>;
  };
}

export interface OrdersOvertimeChartResponse {
  data: {
    year: string;
    data: Array<{
      name: string;
      data: number[];
    }>;
  }[];
}
