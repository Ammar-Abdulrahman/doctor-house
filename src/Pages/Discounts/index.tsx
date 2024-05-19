import React, { useState } from "react";
import useDiscounts from "@Hooks/useDiscounts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Discount } from "@Types/Discounts";
import EnhancedTable from "@Components/Table";
import { getDiscountColumns } from "./Columns/index";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import { toast } from 'react-toastify';

const Discounts: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [needPagination] = useState(true);
  const { getDiscounts, deleteDiscount } = useDiscounts(needPagination);
  const { data, isLoading, isError, error } = getDiscounts();
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const rows =
    data?.data?.map((discount: Discount) => ({
      id: discount.id,
      code: discount.code,
      percentage: `${discount.percentage}%`,
      from: discount.from,
      to: discount.to,
    })) || [];

  const handleDelete = (id: number) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const handleView = (id: number) => {
    console.log("View:", id);
    setOpenModal(true);
  };

  const handleEdit = (id: any) => {
    console.log("Edit:", id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteDiscount.mutate(currentId, {
        onSuccess: () => {
          toast.success(`${t("modal.delete_discount")}`);
          //toast.success(`Discount with ID: ${currentId} deleted successfully`, { autoClose: false });
          setOpenModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const columns = getDiscountColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.discounts")} />
      <EnhancedTable rows={rows} columns={columns} />
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.discount")}
        itemId={currentId || 0}
      />
    </div>
  );
};

export default Discounts;
