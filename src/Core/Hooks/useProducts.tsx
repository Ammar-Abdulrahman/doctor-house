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
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "@Types/ErrorProps";

const useProducts = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
        toast.success(`${t("modal.success_create_product")}`);
      },
      onError(error: ErrorProps, variables, context) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
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
        toast.success(`${t("modal.success_edit_product")}`);
      },
    }
  );

  const deleteProduct = useMutation(
    (id: number) => deleteData(`/products/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        toast.success(`${t("modal.delete_product")}`);
      },
      onError(error: ErrorProps, variables, context) {
        toast.error(`Error :${error?.response.data.error.message}`, {
          autoClose: false,
        });
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
