import React, { useState } from "react";
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

const Operators: React.FC = () => {
  const [needPagination] = useState(true);
  const { getOperators , createOperator } = useOperators(needPagination);
  const { data, isLoading, isError, error } = getOperators();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { t, i18n } = useTranslation();

  const rows =
    data?.data?.map((operator: Operator) => ({
      id: operator.id,
      username: operator.username,
      fullName: operator.fullName,
      role:operator.role.name.ar
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

    const handleFormSubmit = async (formData:OperatorRequest) => {
      setSubmitting(true);
      try {
        createOperator.mutate(formData);
        setModalOpen(false);
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setSubmitting(false);
      }
    };

  const handleView = (id: number) => {
    console.log("View:", id);
  };

  const handleEdit = (id: any) => {
    console.log("Edit:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
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
          <AddButton onClickFunction={handleAddClick} />
        </Grid>
      </Grid>
      <EnhancedTable rows={rows} columns={columns} />
      <CustomModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSubmitting(false); }}
        title={t("operatorsPage.create")}
        onSubmit={handleFormSubmit}
      >
        <OperatorForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      </CustomModal>
    </div>
  );
};

export default Operators;
