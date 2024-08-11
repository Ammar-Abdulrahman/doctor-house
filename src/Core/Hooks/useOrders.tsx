import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
//   postData,
//   updateData,
//   deleteData,
} from "@Services/apiService";
import {
  OrdersResponse,
  SingleOrderResponse,
} from "@Types/Orders";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useOrders = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  //const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getOrders = () =>
    useQuery<OrdersResponse, Error>(
      ["orders"],
      () =>
        fetchData<OrdersResponse>(
          `/orders?needPagination=${needPagination}`
        ),
      {
        cacheTime: 120000, 
        staleTime: Infinity,
      }
    );

  const getOrder = (id: number) => fetchData<SingleOrderResponse>(`/orders/${id}`);

  return {
    getOrders,
    getOrder,
  };
};

export default useOrders;
