import { useState, useEffect } from "react";
import useDiscounts from "@Hooks/useDiscounts";
import { Discount, DiscountsRequest } from "@Types/Discounts";
import { formatDate } from "@Utils/index";

const useDiscountsContainer = () => {
  const [needPagination] = useState(true);
  const {
    getDiscounts,
    deleteDiscount,
    createDiscount,
    updateDiscount,
    getDiscount,
  } = useDiscounts(needPagination);
  const { data, isLoading, isError, error, refetch } = getDiscounts();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Discount | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const rows =
    data?.data?.map((discount: Discount) => ({
      id: discount.id,
      code: discount.code,
      percentage: discount.percentage ? `${discount.percentage}%` : "-",
      from: formatDate(discount.from),
      to: formatDate(discount.to),
      value: discount.value ?? "-",
    })) || [];

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const handleDelete = (id: number) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const handleView = (id: number) => {
    setCurrentId(id);
    setOpenViewModal(true);
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getDiscount(currentId).then((response) => {
        setCurrentDiscount(response.data);
      });
    }
  }, [currentId]);

  const handleEdit = (id: number) => {
    const discount =
      data?.data.find((discount: Discount) => discount.id === id) || null;
    setEditData(discount);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteDiscount.mutate(currentId, {
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

  const handleFormSubmit = async (formData: DiscountsRequest) => {
    setSubmitting(true);
    try {
      createDiscount.mutate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFormSubmit = async (formData: DiscountsRequest) => {
    if (editData) {
      setSubmitting(true);
      try {
        updateDiscount.mutate({ ...formData, id: editData.id });
        setEditModalOpen(false);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    modalOpen,
    editModalOpen,
    openViewModal,
    openModal,
    currentDiscount,
    currentId,
    editData,
    isSubmitting,
    handleRefetch,
    handleDelete,
    handleAddClick,
    handleView,
    handleEdit,
    confirmDelete,
    handleFormSubmit,
    handleEditFormSubmit,
    setModalOpen,
    setOpenModal,
    setEditModalOpen,
    setOpenViewModal,
    setSubmitting,
  };
};

export default useDiscountsContainer;
