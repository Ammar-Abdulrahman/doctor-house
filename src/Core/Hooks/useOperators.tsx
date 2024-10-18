import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/Api/apiService";
import {
  OperatorResponse,
  OperatorRequest,
  SingleOperatorResponse,
} from "@Types/Operator";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

const useOperators = (
  needPagination: boolean
  //limit: number = 10,
  //page: number = 0
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getOperators = () =>
    useQuery<OperatorResponse, Error>(
      ["operators"],
      () =>
        fetchData<OperatorResponse>(
          `/operators?needPagination=${needPagination}`
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

  const getOperator = (id: number) =>
    fetchData<SingleOperatorResponse>(`/operators/${id}`);

  const createOperator = useMutation(
    (newOperator: OperatorRequest) => postData("/operators", newOperator),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("operators");
        toast.success(`${t("modal.success_create_operator")}`);
      },
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
      },
    }
  );

  const updateOperator = () =>
    useMutation(
      (operator: OperatorRequest & { id: number }) =>
        updateData(`/Operators/${operator.id}`, operator),
      {
        onSuccess: (_, operator) => {
          queryClient.invalidateQueries(["operator", operator.id]);
          queryClient.invalidateQueries("operators");
          toast.success(`${t("modal.success_edit_operator")}`);
        },
      }
    );

  const deleteOperator = useMutation(
    (id: number) => deleteData(`/operators/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("operators");
        toast.success(`${t("modal.delete_operator")}`);
      },
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
      },
    }
  );

  return {
    getOperators,
    getOperator,
    createOperator,
    updateOperator,
    deleteOperator,
  };
};

export default useOperators;
