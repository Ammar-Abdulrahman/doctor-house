import React, { useEffect, useState } from "react";
import useOrders from "@Hooks/useOrders";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Order } from "@Types/Orders";
import { getOrderColumns } from "./Columns";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, Chip, IconButton } from "@mui/material";
import CustomModal from "@Components/Modal/CreateModal";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import ViewModal from "@Components/Modal/ViewModal";
import ViewOrderModal from "./Components/ViewOrderModal";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import { formatDate } from "@Utils/index";

const Orders: React.FC = () => {
  const [needPagination] = useState(true);
  const { getOrders, getOrder } = useOrders(needPagination);
  const { data, isLoading, isError, error, refetch } = getOrders();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const { t, i18n } = useTranslation();

  const rows =
    data?.data?.map((order: Order) => ({
      id: order.id,
      user: order.user.name,
      status: order.status ? (
        <Chip
          sx={{ color: "white", borderRadius: 2 }}
          label={order.status}
          color={"info"}
        />
      ) : (
        ""
      ),
      date: order.date ? formatDate(order.date) : "-",
      deliveryOption: order.deliverOption ? (
        <Chip
          sx={{ color: "white", borderRadius: 2 }}
          label={order.deliverOption}
          color={order.deliverOption === "Paid" ? "primary" : "secondary"}
        />
      ) : (
        ""
      ),
    })) || [];

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

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

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.orders")} />
        </Grid>
        <Grid item xs={6} md={0.5}>
          <IconButton onClick={handleRefetch}>
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>
      <EnhancedTable rows={rows} columns={columns} />
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_order")}
      >
        <ViewOrderModal order={currentOrder} />
      </ViewModal>
    </div>
  );
};

export default Orders;
