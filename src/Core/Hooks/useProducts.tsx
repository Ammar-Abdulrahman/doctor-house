import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  ProductsResponse,
  ProductsRequest,
  Product,
} from "@Types/Products";

const useProducts = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getProducts = () =>
    useQuery<ProductsResponse, Error>(
      ["products"],
      () =>
        fetchData<ProductsResponse>(
          `/products?needPagination=${needPagination}`
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

  const getProduct = (id: number) =>
    useQuery<Product, Error>(["product", id], () =>
      fetchData<Product>(`/products/${id}`)
    );

  const createProduct = () =>
    useMutation(
      (newProduct: ProductsRequest) => postData("/products", newProduct),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
        },
      }
    );

  // const updateCategory = () =>
  //   useMutation(
  //     (category: CategoryRequest & { id: number }) =>
  //       updateData(`/categories/${category.id}`, category),
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(["category", category.id]);
  //       },
  //     }
  //   );

  const updateProduct = () => {
    return useMutation(
      (product: ProductsRequest & { id: number }) =>
        updateData(`/products/${product.id}`, product),
      {
        onSuccess: (_, product) => {
          // Now category is defined within this scope
          queryClient.invalidateQueries(["product", product.id]);
        },
      }
    );
  };
  

  const deleteProduct = () =>
    useMutation((id: number) => deleteData(`/products/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    });

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
