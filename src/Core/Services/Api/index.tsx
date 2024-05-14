import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "@Constants/Shared";

export const createService = (entity: string) => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery([entity], async () => {
      const { data } = await api.get(`/${entity}`);
      return data;
    });

  const getOne = (id: string) =>
    useQuery([entity, id], async () => {
      const { data } = await api.get(`/${entity}/${id}`);
      return data;
    });

  const deleteById = (id: string) =>
    useMutation(() => api.delete(`/${entity}/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries([entity]);
      },
    });

  const patch = (id: string, updates: any) =>
    useMutation(() => api.patch(`/${entity}/${id}`, updates), {
      onSuccess: () => {
        queryClient.invalidateQueries([entity]);
      },
    });

  const search = (query: string) =>
    useQuery([entity, "search", query], async () => {
      const { data } = await api.get(`/${entity}/search?q=${query}`);
      return data;
    });

  return { getAll, getOne, deleteById, patch, search };
};


   // Usage example for 'exercises' entity
//const exercisesService = createService('exercises');

