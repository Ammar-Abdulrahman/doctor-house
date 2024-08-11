import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  AdvertisementsResponse,
  AdvertisementsRequest,
  Advertisement,
  SingleAdvertisementResponse,
} from "@Types/Advertisements";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useAdvertisements = () =>
  //needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
  {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const getAdvertisements = () =>
      useQuery<AdvertisementsResponse, Error>(
        ["advertisements"],
        () => fetchData<AdvertisementsResponse>(`/ads`),
        {
          cacheTime: 120000,
          staleTime: Infinity,
        }
      );

    const getAdvertisement = (id: number) =>
      fetchData<SingleAdvertisementResponse>(`/ads/${id}`);

    const createAdvertisement = useMutation(
      (newAddvertisement: AdvertisementsRequest) =>
        postData("/ads", newAddvertisement),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("advertisements");
          toast.success(`${t("modal.success_create_advertisement")}`);
        },
      }
    );

    const updateAdvertisement = () => {
      return useMutation(
        (advertisement: AdvertisementsRequest & { id: number }) =>
          updateData(`/ads/${advertisement.id}`, advertisement),
        {
          onSuccess: (_, advertisement) => {
            queryClient.invalidateQueries(["advertisements", advertisement.id]);
            queryClient.invalidateQueries("advertisements");
            toast.success(`${t("modal.success_edit_advertisement")}`);
          },
        }
      );
    };

    const deleteAdvertisement = useMutation(
      (id: number) => deleteData(`/ads/${id}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("advertisements");
          toast.success(`${t("modal.delete_advertisement")}`);
        },
      }
    );

    return {
      getAdvertisements,
      getAdvertisement,
      createAdvertisement,
      updateAdvertisement,
      deleteAdvertisement,
    };
  };

export default useAdvertisements;
