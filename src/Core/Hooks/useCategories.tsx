import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  CategoriesResponse,
  CategoryRequest,
  Category,
  SingleCategoryResponse,
} from "@Types/Categories";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
