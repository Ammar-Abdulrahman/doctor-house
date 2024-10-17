import React, { useState, useEffect } from "react";
import useCategories from "@Hooks/useCategories";
import { Category, CategoryRequest } from "@Types/Categories";

const useCategoriesContainer = () => {
  const [needPagination] = useState(false);
  const {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory,
  } = useCategories(needPagination);
  const { data, isLoading, isError, error, refetch } = getCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
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
      getCategory(currentId).then((response) => {
        setCurrentCategory(response.data);
      });
    }
  }, [currentId]);

  const handleEditClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleEdit(id);
    };

  const handleEdit = (id: number) => {
    const category =
      data?.data.find((category: Category) => category.id === id) || null;
    setEditData(category);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteCategory.mutate(currentId, {
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

  const handleFormSubmit = async (formData: CategoryRequest) => {
    setSubmitting(true);
    try {
      createCategory.mutate(formData);
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
    currentCategory,
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
    setCurrentCategory,
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

export default useCategoriesContainer;
