import { useQuery } from "react-query";
import { fetchData } from "@Services/Api/apiService";
import {
  ActiveUsersResponse,
  OrdersOvertimeResponse,
  TopThreeBuyersResponse,
  TotalRevenueResponse,
} from "@Types/Statistics";
import { toast } from "react-toastify";
import { ErrorProps } from "@Types/ErrorProps";

const useDashboardData = () => {
  const getActiveUsersCount = () =>
    useQuery<ActiveUsersResponse, Error>(
      ["activeUsersCount"],
      () => fetchData<ActiveUsersResponse>("/statistics/active-users-count"),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

  const getTotalProductsRevenue = () =>
    useQuery<TotalRevenueResponse, Error>(
      ["totalProductsRevenue"],
      () =>
        fetchData<TotalRevenueResponse>("/statistics/total-products-revenue"),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

  const getTopThreeBuyers = () =>
    useQuery<TopThreeBuyersResponse, Error>(
      ["topThreeBuyers"],
      () => fetchData<TopThreeBuyersResponse>("/statistics/top-three-buyers"),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

  const getOrdersOvertime = () =>
    useQuery<OrdersOvertimeResponse, Error>(
      ["ordersOvertime"],
      () =>
        fetchData<OrdersOvertimeResponse>("/statistics/orders-overtime-chart"),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

  return {
    getActiveUsersCount,
    getTotalProductsRevenue,
    getTopThreeBuyers,
    getOrdersOvertime,
  };
};

export default useDashboardData;
