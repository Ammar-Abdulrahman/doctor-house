import { useState, useEffect } from "react";
import useOrders from "@Hooks/useOrders";
import { Order } from "@Types/Orders";
import { formatDate } from "@Utils/index";
import { Chip } from "@mui/material";

const useOrdersContainer = () => {
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

  return {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    modalOpen,
    openViewModal,
    currentOrder,
    currentId,
    isSubmitting,
    openDeleteModal,
    handleRefetch,
    handleDelete,
    handleView,
    handleEdit,
    setModalOpen,
    setOpenViewModal,
    setSubmitting,
  };
};

export default useOrdersContainer;
