import React, { useState, useEffect } from "react";
import useProducts from "@Hooks/useProducts";
import { Product, ProductsRequest } from "@Types/Products";
import { useTranslation } from "react-i18next";

const useProductsContainer = () => {
  const {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
  } = useProducts(true);
  const { data, isLoading, isError, error, refetch } = getProducts();
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setCurrentId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const handleDeleteClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      setOpenModal(true);
      handleDelete();
    };

  const handleDelete = () => {
    //setCurrentId(id);
    //console.log(id)
    setOpenModal(true);
    handleMenuClose();
  };

  const handleViewClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleView();
    };

  const handleView = () => {
    //setCurrentId(id);
    setOpenViewModal(true);
    handleMenuClose();
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getProduct(currentId).then((response) => {
        setCurrentProduct(response.data);
      });
    }
  }, [currentId]);

  const handleEditClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleEdit(id);
    };

  const handleEdit = (id: number) => {
    const product =
      data?.data.find((product: Product) => product.id === id) || null;
    setEditData(product);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteProduct.mutate(currentId, {
        onSuccess: () => {
          setOpenModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData: ProductsRequest) => {
    setSubmitting(true);
    try {
      createProduct.mutate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    data,
    isError,
    isLoading,
    isRefetching,
    isSubmitting,
    confirmDelete,
    currentProduct,
    currentId,
    error,
    handleAddClick,
    handleDeleteClick,
    handleEditClick,
    handleFormSubmit,
    handleMenuClose,
    handleMenuOpen,
    handleRefetch,
    handleViewClick,
    anchorEl,
    setCurrentProduct,
    setCurrentId,
    setModalOpen,
    setOpenModal,
    setOpenViewModal,
    setSubmitting,
    modalOpen,
    openModal,
    openViewModal,
  };
};

export default useProductsContainer;
