import { useLocale } from "@Context/LanguageContext";
import useOperators from "@Hooks/useOperators";
import { Operator, OperatorRequest } from "@Types/Operator";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useOperatorsContainer = () => {
  const [needPagination] = useState(true);
  const { getOperators, createOperator, deleteOperator, getOperator } =
    useOperators(needPagination);
  const { data, isLoading, isError, error, refetch } = getOperators();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const { i18n } = useTranslation();
  const { locale } = useLocale();

  const rows =
    data?.data?.map((operator: Operator) => ({
      id: operator.id,
      username: operator.username,
      fullName: operator.fullName,
      role: locale === "ar" ? operator.role.name.ar : operator.role.name.en,
    })) || [];

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const handleFormSubmit = async (formData: OperatorRequest) => {
    setSubmitting(true);
    try {
      createOperator.mutate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (id: number) => {
    setCurrentId(id);
    setOpenViewModal(true);
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getOperator(currentId).then((response) => {
        setCurrentOperator(response.data);
      });
    }
  }, [currentId]);

  const handleEdit = (id: any) => {
    console.log("Edit:", id);
  };

  const handleDelete = (id: number) => {
    setCurrentId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteOperator.mutate(currentId, {
        onSuccess: () => {
          setOpenDeleteModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  return {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    modalOpen,
    openViewModal,
    currentOperator,
    currentId,
    openDeleteModal,
    isSubmitting,
    handleRefetch,
    handleDelete,
    handleAddClick,
    handleView,
    handleEdit,
    confirmDelete,
    handleFormSubmit,
    setModalOpen,
    setOpenViewModal,
    setSubmitting,
    setOpenDeleteModal,
  };
};
export default useOperatorsContainer;
