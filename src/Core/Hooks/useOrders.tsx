import { useQuery } from "react-query";
import { fetchData } from "@Services/apiService";
import { OrdersResponse, SingleOrderResponse } from "@Types/Orders";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

const useOrders = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const { t } = useTranslation();

  const getOrders = () =>
    useQuery<OrdersResponse, Error>(
      ["orders"],
      () =>
        fetchData<OrdersResponse>(`/orders?needPagination=${needPagination}`),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

  const getOrder = (id: number) =>
    fetchData<SingleOrderResponse>(`/orders/${id}`);

  return {
    getOrders,
    getOrder,
  };
};

export default useOrders;
