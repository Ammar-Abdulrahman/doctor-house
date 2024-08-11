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
  SingleProductResponse,
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
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

  const getProduct = (id: number) =>
    fetchData<SingleProductResponse>(`/products/${id}`);

  const createProduct = useMutation(
    (newProduct: ProductsRequest) => postData("/products", newProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  const updateProduct = useMutation(
    (product: ProductsRequest & { id: number }) =>
      updateData(`/products/${product.id}`, product),
    {
      onSuccess: (_, product) => {
        queryClient.invalidateQueries(["product", product.id]);
        queryClient.invalidateQueries("products");
      },
    }
  );

  const deleteProduct = useMutation(
    (id: number) => deleteData(`/products/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
