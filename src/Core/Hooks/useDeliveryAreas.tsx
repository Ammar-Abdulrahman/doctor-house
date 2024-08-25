import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  DeliveryAreasResponse,
  DeliveryAreasRequest,
  SingleDeliveryAreaResponse,
} from "@Types/Delivery-areas";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

const useDeliveryAreas = () =>
  //needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
  {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const getDeliveryAreas = () =>
      useQuery<DeliveryAreasResponse, Error>(
        ["delivery-areas"],
        () => fetchData<DeliveryAreasResponse>(`/delivery-areas`),
        {
          cacheTime: 120000,
          staleTime: Infinity,
        }
      );

    const getDeliveryArea = (id: number) =>
      fetchData<SingleDeliveryAreaResponse>(`/delivery-areas/${id}`);

    const createDeliveryArea = useMutation(
      (newDeliveryArea: DeliveryAreasRequest) =>
        postData("/delivery-areas", newDeliveryArea),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("delivery-areas");
          toast.success(`${t("modal.success_create_delivery_area")}`);
        },
        onError(error: ErrorProps, variables, context) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

    const updateDeliveryArea = useMutation(
      (DeliveryArea: DeliveryAreasRequest & { id: number }) =>
        updateData(`/delivery-areas/${DeliveryArea.id}`, DeliveryArea),
      {
        onSuccess: (_, DeliveryArea) => {
          queryClient.invalidateQueries(["delivery-area", DeliveryArea.id]);
          queryClient.invalidateQueries("delivery-areas");
          toast.success(`${t("modal.success_edit_delivery_area")}`);
        },
        onError(error: ErrorProps, variables, context) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

    const deleteDeliveryArea = useMutation(
      (id: number) => deleteData(`/delivery-areas/${id}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("delivery-areas");
          toast.success(`${t("modal.delete_delivery_area")}`);
        },
        onError(error: ErrorProps, variables, context) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );

    return {
      getDeliveryAreas,
      getDeliveryArea,
      createDeliveryArea,
      updateDeliveryArea,
      deleteDeliveryArea,
    };
  };

export default useDeliveryAreas;
