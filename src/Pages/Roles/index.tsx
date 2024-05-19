import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Role } from "@Types/Roles";
import EnhancedTable from "@Components/Table";
import useRoles from "@Hooks/useRoles";
import { getRoleColumns } from "./Columns";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import { toast } from "react-toastify";

const Roles: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [needPagination] = useState(true);
  const { getRoles , deleteRole } = useRoles(needPagination);
  const { data, isLoading, isError, error } = getRoles();
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const rows =
    data?.data?.map((role: Role) => ({
      id: role.id,
      name_ar: role.name.ar,
      name_en: role.name.en,
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
      deleteRole.mutate(currentId, {
        onSuccess: () => {
          toast.success(`Role with ID: #${currentId} deleted successfully`);
          setOpenModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const columns = getRoleColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.roles")} />
      <EnhancedTable rows={rows} columns={columns} />
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.role")}
        itemId={currentId || 0}
      />
    </div>
  );
};

export default Roles;
