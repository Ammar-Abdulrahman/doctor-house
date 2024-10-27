import React from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import EnhancedTable from "@Components/Table";
import { getDiscountColumns } from "./Helper/index";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import DiscountForm from "./Components/DiscountForm";
import ViewDiscountModal from "./Components/ViewDiscount";
import ViewModal from "@Components/Modal/ViewModal";
import RefreshIcon from "@mui/icons-material/Refresh";
import useDiscountsContainer from "./Container/useDiscountsContainer";
import { useLocale } from "@Context/LanguageContext";
import SkeletonTable from "@Components/Skeleton/Table";

const Discounts: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const {
    rows,
    isLoading,
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
  } = useDiscountsContainer();

  const columns = getDiscountColumns(t, handleDelete, handleView, handleEdit);

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.discounts")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createDiscount"
                onClickFunction={handleAddClick}
              />
            </Grid>
            <Grid item xs={3} md={1}>
              <IconButton onClick={handleRefetch}>
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
        open={modalOpen || editModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditModalOpen(false);
          setSubmitting(false);
        }}
        title={
          modalOpen ? t("modal.create_discount") : t("modal.edit_discount")
        }
        onSubmit={modalOpen ? handleFormSubmit : handleEditFormSubmit}
      >
        <DiscountForm
          onSubmit={modalOpen ? handleFormSubmit : handleEditFormSubmit}
          isSubmitting={isSubmitting}
          onClose={() => {
            setModalOpen(false);
            setEditModalOpen(false);
            setSubmitting(false);
          }}
          initialValues={modalOpen ? {} : editData}
        />
      </CustomModal>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.discount")}
        itemId={currentId || 0}
      />
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_discount")}
      >
        <ViewDiscountModal discount={currentDiscount} />
      </ViewModal>
    </div>
  );
};

export default Discounts;
