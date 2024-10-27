import React from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import EnhancedTable from "@Components/Table";
import { getDeliveryAreaColumns } from "./Helper/index";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import DeliveryAreaForm from "./Components/DeliveryAreaForm";
import ViewDeliveryAreaModal from "./Components/ViewDeliveryAreaModal";
import ViewModal from "@Components/Modal/ViewModal";
import EditDeliveryAreaForm from "./Components/EditDeliveryAreaForm";
import RefreshIcon from "@mui/icons-material/Refresh";
import useDeliveryAreasContainer from "./Container/useDeliveryAreasContainer";
import { useLocale } from "@Context/LanguageContext";
import SkeletonTable from "@Components/Skeleton/Table";

const DeliveryAreas: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const {
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
  } = useDeliveryAreasContainer();

  const columns = getDeliveryAreaColumns(
    t,
    handleDelete,
    handleView,
    handleEdit
  );

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.delivery_areas")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createDeliveryArea"
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
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSubmitting(false);
        }}
        title={t("modal.create_delivery_area")}
        onSubmit={handleFormSubmit}
      >
        <DeliveryAreaForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          onClose={() => {
            setModalOpen(false);
            setSubmitting(false);
          }}
        />
      </CustomModal>
      <CustomModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSubmitting(false);
        }}
        title={t("modal.edit_delivery_area")}
        onSubmit={handleEditFormSubmit}
      >
        {editData && (
          <EditDeliveryAreaForm
            defaultValues={editData}
            onSubmit={handleEditFormSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </CustomModal>
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.delivery_area")}
        itemId={currentId || 0}
      />
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_delivery_area")}
      >
        <ViewDeliveryAreaModal deliveryArea={currentDeliveryArea} />
      </ViewModal>
    </div>
  );
};

export default DeliveryAreas;
