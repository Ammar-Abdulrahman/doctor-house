// import { useQuery, useMutation, useQueryClient } from "react-query";
// import {
//   fetchData,
//   postData,
//   updateData,
//   deleteData,
// } from "@Services/apiService";

// const useCategories = (
//   enabled: boolean,
//   pageSize: number = 10,
//   page: number = 1
// ) => {
//   const queryClient = useQueryClient();

//   const getCategories = () =>
//     useQuery(["categories", page], () =>
//       fetchData(
//         `/categories?needPagination=${enabled}&page=${page}&limit=${pageSize}`
//       )
//     );

//   const getCategory = (id: string) =>
//     useQuery(["category", id], () => fetchData(`/categories/${id}`));

//   const createCategory = () =>
//     useMutation(
//       (newCategory: { name: string; image: File }) =>
//         postData("/categories", newCategory),
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries("categories");
//         },
//       }
//     );

//   const updateCategory = () =>
//     useMutation(
//       (category: { id: string; name: string; image: File }) =>
//         updateData(`/categories/${category.id}`, category),
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["category", category.id]);
//         },
//       }
//     );

//   const deleteCategory = () =>
//     useMutation((id: string) => deleteData(`/categories/${id}`), {
//       onSuccess: () => {
//         queryClient.invalidateQueries("categories");
//       },
//     });

//   return {
//     getCategories,
//     getCategory,
//     createCategory,
//     updateCategory,
//     deleteCategory,
//   };
// };

// export default useCategories;

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
} from "@Types/Categories";

const useCategories = (
  needPagination: boolean,
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
        cacheTime: 1000 * 60 * 5, 
        //keepPreviousData: needPagination, // Keep previous data while fetching new data during pagination
        //enabled: needPagination, // Enable or disable query based on the flag
      }
    );

  const getCategory = (id: number) =>
    useQuery<Category, Error>(["category", id], () =>
      fetchData<Category>(`/categories/${id}`)
    );

  const createCategory = () =>
    useMutation(
      (newCategory: CategoryRequest) => postData("/categories", newCategory),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("categories");
        },
      }
    );

  const updateCategory = () =>
    useMutation(
      (category: CategoryRequest & { id: number }) =>
        updateData(`/categories/${category.id}`, category),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["category", category.id]);
        },
      }
    );

  const deleteCategory = () =>
    useMutation((id: number) => deleteData(`/categories/${id}`), {
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
