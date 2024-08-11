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
  SingleDiscountResponse,
  //Discount,
} from "@Types/Discounts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useDiscounts = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
    fetchData<SingleDiscountResponse>(`/discounts/${id}`);

  const createDiscount = useMutation(
    (newDiscount: DiscountsRequest) => postData("/discounts", newDiscount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("discounts");
        toast.success(`${t("modal.success_create_discount")}`);
      },
    }
  );

  const updateDiscount = useMutation(
    (discount: DiscountsRequest & { id: number }) =>
      updateData(`/discounts/${discount.id}`, discount),
    {
      onSuccess: (_, discount) => {
        queryClient.invalidateQueries(["discount", discount.id]);
        queryClient.invalidateQueries("discounts");
        toast.success(`${t("modal.success_edit_discount")}`);
      },
    }
  );

  const deleteDiscount = useMutation(
    (id: number) => deleteData(`/discounts/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("discounts");
        toast.success(`${t("modal.delete_discount")}`);
      },
    }
  );

  return {
    getDiscounts,
    getDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount,
  };
};

export default useDiscounts;
