import React, { useEffect, useState } from "react";
import useOrders from "@Hooks/useOrders";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Order } from "@Types/Orders";
import { getOrderColumns } from "./Columns";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, Chip } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import ViewModal from "@Components/Modal/ViewModal";
import { toast } from "react-toastify";

const Orders: React.FC = () => {
  const [needPagination] = useState(true);
  const { getOrders, getOrder } = useOrders(needPagination);
  const { data, isLoading, isError, error } = getOrders();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const { t, i18n } = useTranslation();

  const rows =
    data?.data?.map((order: Order) => ({
      id: order.id,
      user: order.user.name,
      status: order.status ? (
        <Chip label={order.status} color="secondary" />
      ) : (
        ""
      ),
      date: order.date,
      deliveryOption: order.deliverOption,
    })) || [];

  const handleView = (id: number) => {
    setCurrentId(id);
    setOpenViewModal(true);
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getOrder(currentId).then((response) => {
        setCurrentOrder(response.data);
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

  const columns = getOrderColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.orders")} />
        </Grid>
      </Grid>
      <EnhancedTable rows={rows} columns={columns} />
      {/* <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_operator")}
      >
        <ViewOperatorModal operator={currentOperator} />
      </ViewModal> */}
    </div>
  );
};

export default Orders;
