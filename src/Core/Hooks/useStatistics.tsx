// @Hooks/useDashboardData.ts
import { useQuery } from "react-query";
import { fetchData } from "@Services/apiService";
import {
  ActiveUsersResponse,
  OrdersOvertimeResponse,
  TopThreeBuyersResponse,
  TotalRevenueResponse,
} from "@Types/Statistics";

const useDashboardData = () => {
  const getActiveUsersCount = () =>
    useQuery<ActiveUsersResponse, Error>(["activeUsersCount"], () =>
      fetchData<ActiveUsersResponse>("/statistics/active-users-count")
    );

  const getTotalProductsRevenue = () =>
    useQuery<TotalRevenueResponse, Error>(["totalProductsRevenue"], () =>
      fetchData<TotalRevenueResponse>("/statistics/total-products-revenue")
    );

  const getTopThreeBuyers = () =>
    useQuery<TopThreeBuyersResponse, Error>(["topThreeBuyers"], () =>
      fetchData<TopThreeBuyersResponse>("/statistics/top-three-buyers")
    );

  const getOrdersOvertime = () =>
    useQuery<OrdersOvertimeResponse, Error>(["ordersOvertime"], () =>
      fetchData<OrdersOvertimeResponse>("/statistics/orders-overtime-chart")
    );

  return {
    getActiveUsersCount,
    getTotalProductsRevenue,
    getTopThreeBuyers,
    getOrdersOvertime,
  };
};

export default useDashboardData;
