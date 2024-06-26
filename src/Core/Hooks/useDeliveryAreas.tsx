import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import { DeliveryAreasResponse, DeliveryAreasRequest, SingleDeliveryAreaResponse } from "@Types/Delivery-areas";

const useDeliveryAreas = (
  //needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getDeliveryAreas = () =>
    useQuery<DeliveryAreasResponse, Error>(
      ["delivery-areas"],
      () =>
        fetchData<DeliveryAreasResponse>(
          `/delivery-areas`
        ),
      {
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

    const getDeliveryArea = (id: number) => fetchData<SingleDeliveryAreaResponse>(`/delivery-areas/${id}`);

    
    const createDeliveryArea = useMutation(
      (newDeliveryArea: DeliveryAreasRequest) => postData("/delivery-areas", newDeliveryArea),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("delivery-areas");
        },
      }
    );

    const updateDeliveryArea = useMutation(
      (DeliveryArea: DeliveryAreasRequest & { id: number }) => updateData(`/delivery-areas/${DeliveryArea.id}`, DeliveryArea),
      {
        onSuccess: (_,DeliveryArea) => {
          queryClient.invalidateQueries(["delivery-area", DeliveryArea.id]);
        },
      }
    );

    const deleteDeliveryArea = useMutation((id: number) => deleteData(`/delivery-areas/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("delivery-areas");
      },
    });

  return {
    getDeliveryAreas,
    getDeliveryArea,
    createDeliveryArea,
    updateDeliveryArea,
    deleteDeliveryArea,
  };
};

export default useDeliveryAreas;
