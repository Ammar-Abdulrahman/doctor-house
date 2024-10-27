import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/Api/apiService";
import {
  DiscountsResponse,
  DiscountsRequest,
  SingleDiscountResponse,
} from "@Types/Discounts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

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
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
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
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
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
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
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
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
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
