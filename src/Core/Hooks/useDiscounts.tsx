import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  DiscountsResponse,
  DiscountsRequest,
  Discount,
} from "@Types/Discounts";

const useDiscounts = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getDiscounts = () =>
    useQuery<DiscountsResponse, Error>(
      ["discounts"],
      () =>
        fetchData<DiscountsResponse>(
          `/discounts?needPagination=${needPagination}`
        ),
      {
        cacheTime: 120000, 
        staleTime: Infinity,
      }
    );

  const getDiscount = (id: number) =>
    useQuery<Discount, Error>(["discount", id], () =>
      fetchData<Discount>(`/discounts/${id}`)
    );

  const createDiscount = () =>
    useMutation(
      (newDiscount: DiscountsRequest) => postData("/discounts", newDiscount),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("discounts");
        },
      }
    );

  // const updateDiscount = () =>
  //   useMutation(
  //     (discount: DiscountsRequest & { id: number }) =>
  //       updateData(`/discounts/${discount.id}`, discount),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(["discount", discount.id]);
  //       },
  //     }
  //   );

  const updateDiscount = () => {
    return useMutation(
      (discount: DiscountsRequest & { id: number }) =>
        updateData(`/discounts/${discount.id}`, discount),
      {
        onSuccess: (_,discount) => {
          queryClient.invalidateQueries(["discount", discount.id]);
        },
      }
    );
  };

  const deleteDiscount = () =>
    useMutation((id: number) => deleteData(`/discounts/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("discounts");
      },
    });

  return {
    getDiscounts,
    getDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount,
  };
};

export default useDiscounts;
