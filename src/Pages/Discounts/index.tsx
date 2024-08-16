import React, { useEffect, useState } from "react";
import useDiscounts from "@Hooks/useDiscounts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Discount, DiscountsRequest } from "@Types/Discounts";
import EnhancedTable from "@Components/Table";
import { getDiscountColumns } from "./Columns/index";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import { toast } from "react-toastify";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import DiscountForm from "./Components/DiscountForm";
import ViewDiscountModal from "./Components/ViewDiscount";
import EditDiscountForm from "./Components/EditDiscountForm";
import ViewModal from "@Components/Modal/ViewModal";
import RefreshIcon from "@mui/icons-material/Refresh";

const Discounts: React.FC = () => {
  const { t, i18n } = useTranslation();
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
      from: discount.from,
      to: discount.to,
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

  const columns = getDiscountColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.discounts")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createRole"
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
        title={t("modal.create_discount")}
        onSubmit={handleFormSubmit}
      >
        <DiscountForm
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
        title="Edit Discount"
        onSubmit={handleEditFormSubmit}
      >
        {editData && (
          <EditDiscountForm
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
