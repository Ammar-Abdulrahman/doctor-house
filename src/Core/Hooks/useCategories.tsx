import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/Api/apiService";
import {
  CategoriesResponse,
  CategoryRequest,
  SingleCategoryResponse,
} from "@Types/Categories";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

const useCategories = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getCategories = () =>
    useQuery<CategoriesResponse, Error>(
      ["categories"],
      () =>
        fetchData<CategoriesResponse>(
          `/categories?needPagination=${needPagination}`
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

  const getCategory = (id: number) =>
    fetchData<SingleCategoryResponse>(`/categories/${id}`);

  const createCategory = useMutation(
    (newCategory: CategoryRequest) => postData("/categories", newCategory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        toast.success(`${t("modal.success_create_category")}`);
      },
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
      },
    }
  );

  const updateCategory = () => {
    return useMutation(
      (category: CategoryRequest & { id: number }) =>
        updateData(`/categories/${category.id}`, category),
      {
        onSuccess: (_, category) => {
          queryClient.invalidateQueries(["category", category.id]);
          queryClient.invalidateQueries("categories");
          toast.success(`${t("modal.success_edit_category")}`);
        },
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
      }
    );
  };

  const deleteCategory = useMutation(
    (id: number) => deleteData(`/categories/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        toast.success(`${t("modal.delete_category")}`);
      },
      onError(error: ErrorProps) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
      },
    }
  );

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
