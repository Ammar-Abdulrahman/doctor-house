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

const useCategories = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getCategories = () =>
    useQuery<CategoriesResponse, Error>(
      ["categories"],
      () =>
        fetchData<CategoriesResponse>(
          `/categories?needPagination=${needPagination}`
        ),
      {
        // refetchOnWindowFocus: false,
        // refetchOnMount: false,
        // refetchOnReconnect: false,
        // enabled: false,
        cacheTime: 120000,
        staleTime: Infinity,
        //keepPreviousData: needPagination, // Keep previous data while fetching new data during pagination
        //enabled: needPagination, // Enable or disable query based on the flag
      }
    );

    const getCategory = (id: number) => fetchData<SingleCategoryResponse>(`/categories/${id}`);

    const createCategory = useMutation(
      (newCategory: CategoryRequest) => postData("/categories", newCategory),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("categories");
        },
      }
    );


  const updateCategory = () => {
    return useMutation(
      (category: CategoryRequest & { id: number }) =>
        updateData(`/categories/${category.id}`, category),
      {
        onSuccess: (_, category) => {
          // Now category is defined within this scope
          queryClient.invalidateQueries(["category", category.id]);
        },
      }
    );
  };
  

    const deleteCategory = useMutation((id: number) => deleteData(`/categories/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    });

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
