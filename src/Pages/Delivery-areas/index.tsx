import React, { useEffect, useState } from "react";
import useDeliveryAreas from "@Hooks/useDeliveryAreas";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { DeliveryArea, DeliveryAreasRequest } from "@Types/Delivery-areas";
import EnhancedTable from "@Components/Table";
import { getDeliveryAreaColumns } from "./Columns/index";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import { toast } from "react-toastify";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import DeliveryAreaForm from "./Components/DeliveryAreaForm";
import ViewDeliveryAreaModal from "./Components/ViewDeliveryAreaModal";
import ViewModal from "@Components/Modal/ViewModal";
import EditDeliveryAreaForm from "./Components/EditDeliveryAreaForm";
import RefreshIcon from "@mui/icons-material/Refresh";

const DeliveryAreas: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const rows =
    data?.data?.map((deliveryArea: DeliveryArea) => ({
      id: deliveryArea.id,
      time:
        i18n.language === "ar" ? deliveryArea.time.ar : deliveryArea.time.en,
      area:
        i18n.language === "ar" ? deliveryArea.area.ar : deliveryArea.area.en,
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

  const columns = getDeliveryAreaColumns(
    t,
    handleDelete,
    handleView,
    handleEdit
  );

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
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
      <EnhancedTable rows={rows} columns={columns} />
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
        title="Edit Delivery Area"
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
