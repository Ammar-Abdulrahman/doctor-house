import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import { OperatorResponse, OperatorRequest, Operator } from "@Types/Operator";

const useOperators = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getOperators = () =>
    useQuery<OperatorResponse, Error>(
      ["operators"],
      () =>
        fetchData<OperatorResponse>(
          `/operators?needPagination=${needPagination}`
        ),
      {
        cacheTime: 120000,
        staleTime: Infinity,
        //keepPreviousData: needPagination, // Keep previous data while fetching new data during pagination
        //enabled: needPagination, // Enable or disable query based on the flag
      }
    );

  const getOperator = (id: number) =>
    useQuery<Operator, Error>(["operator", id], () =>
      fetchData<Operator>(`/operators/${id}`)
    );

  const createOperator = () =>
    useMutation(
      (newOperator: OperatorRequest) => postData("/operators", newOperator),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("operators");
        },
      }
    );

  const updateOperator = () =>
    useMutation(
      (operator: OperatorRequest & { id: number }) =>
        updateData(`/Operators/${operator.id}`, operator),
      {
        onSuccess: (_,operator) => {
          queryClient.invalidateQueries(["operator", operator.id]);
        },
      }
    );

  const deleteOperator = () =>
    useMutation((id: number) => deleteData(`/operators/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("operators");
      },
    });

  return {
    getOperators,
    getOperator,
    createOperator,
    updateOperator,
    deleteOperator,
  };
};

export default useOperators;
