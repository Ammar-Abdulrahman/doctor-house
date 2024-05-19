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
} from "@Types/Advertisements";

const useAdvertisements = (
  //needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getAdvertisements = () =>
    useQuery<AdvertisementsResponse, Error>(
      ["advertisements"],
      () =>
        fetchData<AdvertisementsResponse>(
          `/ads`
        ),
      {
        cacheTime: 120000, 
        staleTime: Infinity,
      }
    );

  const getAdvertisement = (id: number) =>
    useQuery<Advertisement, Error>(["advertisement", id], () =>
      fetchData<Advertisement>(`/ads/${id}`)
    );

  const createAdvertisement = () =>
    useMutation(
      (newAdvertisement: AdvertisementsRequest) => postData("/ads", newAdvertisement),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("advertisements");
        },
      }
    );


  const updateAdvertisement = () => {
    return useMutation(
      (Advertisement: AdvertisementsRequest & { id: number }) =>
        updateData(`/ads/${Advertisement.id}`, Advertisement),
      {
        onSuccess: (_,Advertisement) => {
          queryClient.invalidateQueries(["advertisement", Advertisement.id]);
        },
      }
    );
  };

  const deleteAdvertisement = () =>
    useMutation((id: number) => deleteData(`/ads/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("advertisements");
      },
    });

  return {
    getAdvertisements,
    getAdvertisement,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
  };
};

export default useAdvertisements;
