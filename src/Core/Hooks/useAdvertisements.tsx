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

    const getAdvertisement = (id: number) => fetchData<SingleAdvertisementResponse>(`/ads/${id}`);


    const createAdvertisement = useMutation(
      (newAddvertisement: AdvertisementsRequest) => postData("/ads", newAddvertisement),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("advertisements");
        },
      }
    );


    const updateAdvertisement = () => {
      return useMutation(
        (advertisement: AdvertisementsRequest & { id: number }) =>
          updateData(`/ads/${advertisement.id}`, advertisement),
        {
          onSuccess: (_, advertisement) => {
            // Now category is defined within this scope
            queryClient.invalidateQueries(["advertisements", advertisement.id]);
          },
        }
      );
    };
    
  
      const deleteAdvertisement = useMutation((id: number) => deleteData(`/ads/${id}`), {
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
