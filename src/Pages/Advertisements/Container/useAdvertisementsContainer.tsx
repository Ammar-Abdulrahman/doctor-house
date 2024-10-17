import React, { useEffect, useState } from "react";
import useAdvertisements from "@Hooks/useAdvertisements";
import { Advertisement, AdvertisementsRequest } from "@Types/Advertisements";

const useAdvertisementsContainer = () => {
  const {
    getAdvertisements,
    getAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    createAdvertisement,
  } = useAdvertisements();
  const { data, isLoading, isError, error, refetch } = getAdvertisements();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Advertisement | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentAdvertisement, setCurrentAdvertisement] =
    useState<Advertisement | null>(null);
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
    setOpenModal(true);
    handleMenuClose();
  };

  const handleViewClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleView();
    };

  const handleView = () => {
    setOpenViewModal(true);
    handleMenuClose();
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getAdvertisement(currentId).then((response) => {
        setCurrentAdvertisement(response.data);
      });
    }
  }, [currentId]);

  const handleEditClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleEdit(id);
    };

  const handleEdit = (id: number) => {
    const advertisement =
      data?.data.find(
        (advertisement: Advertisement) => advertisement.id === id
      ) || null;
    setEditData(advertisement);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteAdvertisement.mutate(currentId, {
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

  const handleFormSubmit = async (formData: AdvertisementsRequest) => {
    setSubmitting(true);
    try {
      createAdvertisement.mutate(formData);
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
    currentAdvertisement,
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
    setCurrentAdvertisement,
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

export default useAdvertisementsContainer;
