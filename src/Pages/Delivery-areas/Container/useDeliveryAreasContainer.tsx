import { useState, useEffect } from "react";
import { DeliveryArea, DeliveryAreasRequest } from "@Types/Delivery-areas";
import useDeliveryAreas from "@Hooks/useDeliveryAreas";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";

const useDeliveryAreasContainer = () => {
  const { i18n } = useTranslation();
  const {
    getDeliveryAreas,
    deleteDeliveryArea,
    createDeliveryArea,
    updateDeliveryArea,
    getDeliveryArea,
  } = useDeliveryAreas();
  const { data, isLoading, isError, error, refetch } = getDeliveryAreas();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<DeliveryArea | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentDeliveryArea, setCurrentDeliveryArea] =
    useState<DeliveryArea | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const { locale } = useLocale();

  const rows =
    data?.data?.map((deliveryArea: DeliveryArea) => ({
      id: deliveryArea.id,
      time: locale === "ar" ? deliveryArea.time.ar : deliveryArea.time.en,
      area: locale === "ar" ? deliveryArea.area.ar : deliveryArea.area.en,
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
      getDeliveryArea(currentId).then((response) => {
        setCurrentDeliveryArea(response.data);
      });
    }
  }, [currentId]);

  const handleEdit = (id: number) => {
    const deliveryArea = currentDeliveryArea;
    setEditData(deliveryArea);
    console.log(id);
    setEditModalOpen(true);
    console.log("edit");
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteDeliveryArea.mutate(currentId, {
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

  const handleFormSubmit = async (formData: DeliveryAreasRequest) => {
    setSubmitting(true);
    try {
      createDeliveryArea.mutate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFormSubmit = async (formData: DeliveryAreasRequest) => {
    if (editData) {
      setSubmitting(true);
      try {
        updateDeliveryArea.mutate({ ...formData, id: editData.id });
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
    currentDeliveryArea,
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

export default useDeliveryAreasContainer;
