import React, { useEffect, useState } from "react";
import useOperators from "@Hooks/useOperators";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Operator, OperatorRequest } from "@Types/Operator";
import { getOperatorColumns } from "./Columns";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import OperatorForm from "./Components/OperatorForm";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import ViewModal from "@Components/Modal/ViewModal";
import { toast } from "react-toastify";
import ViewOperatorModal from "./Components/ViewOperator";

const Operators: React.FC = () => {
  const [needPagination] = useState(true);
  const { getOperators, createOperator, deleteOperator, getOperator } =
    useOperators(needPagination);
  const { data, isLoading, isError, error } = getOperators();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);

  const { t, i18n } = useTranslation();

  const rows =
    data?.data?.map((operator: Operator) => ({
      id: operator.id,
      username: operator.username,
      fullName: operator.fullName,
      role:
        i18n.language === "ar" ? operator.role.name.ar : operator.role.name.en,
    })) || [];

  const handleAddClick = () => {
    setModalOpen(true);
  };

  // const handleFormSubmit = (formData: OperatorRequest) => {
  //   createOperator.mutate(formData, {
  //     onSuccess: () => {
  //       console.log(formData)
  //       console.log(formData)
  //       setModalOpen(false);
  //     },
  //   });
  // };

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
          toast.success(`${t("modal.delete_operator")}`);
          setOpenDeleteModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const columns = getOperatorColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.operators")} />
        </Grid>
        <Grid item xs={6} md={1}>
          <AddButton requiredPermission="createOperator" onClickFunction={handleAddClick} />
        </Grid>
      </Grid>
      <EnhancedTable rows={rows} columns={columns} />
      <CustomModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSubmitting(false);
        }}
        title={t("modal.create_operator")}
        onSubmit={handleFormSubmit}
      >
        <OperatorForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          onClose={() => {
            setModalOpen(false);
            setSubmitting(false);
          }}
        />
      </CustomModal>
      <ConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.operator")}
        itemId={currentId || 0}
      />
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_operator")}
      >
        <ViewOperatorModal operator={currentOperator} />
      </ViewModal>
    </div>
  );
};

export default Operators;
