import React from "react";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { getOperatorColumns } from "./Helper";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton, Skeleton, useTheme } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import OperatorForm from "./Components/OperatorForm";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import ViewModal from "@Components/Modal/ViewModal";
import ViewOperatorModal from "./Components/ViewOperator";
import RefreshIcon from "@mui/icons-material/Refresh";
import useOperatorsContainer from "./Container/useOperatorsContainer";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";
import SkeletonTable from "@Components/Skeleton/Table";

const Operators: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { locale } = useLocale();
  const {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    modalOpen,
    openViewModal,
    currentOperator,
    currentId,
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
    openDeleteModal,
    setOpenDeleteModal,
  } = useOperatorsContainer();

  const columns = getOperatorColumns(t, handleDelete, handleView, handleEdit);

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.operators")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createOperator"
                onClickFunction={handleAddClick}
              />
            </Grid>
            <Grid item xs={3} md={1}>
              <IconButton
                sx={{ color: theme.palette.primary.main }}
                onClick={handleRefetch}
              >
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isLoading ? (
        <SkeletonTable />
      ) : !isLoading && isRefetching ? (
        <PageLoader />
      ) : (
        <EnhancedTable rows={rows} columns={columns} />
      )}
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
