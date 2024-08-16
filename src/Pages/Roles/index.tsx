import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Role, RoleRequest } from "@Types/Roles";
import EnhancedTable from "@Components/Table";
import useRoles from "@Hooks/useRoles";
import { getRoleColumns } from "./Columns";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import CustomModal from "@Components/Modal/CreateModal";
import ViewModal from "@Components/Modal/ViewModal";
import { toast } from "react-toastify";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import RoleForm from "./Components/RoleForm";
import ViewRoleModal from "./Components/ViewRole";
import RefreshIcon from "@mui/icons-material/Refresh";

const Roles: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [needPagination] = useState(true);
  const { getRoles, deleteRole, createRole, getRole } =
    useRoles(needPagination);
  const { data, isLoading, isError, error, refetch } = getRoles();
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  useState<Role | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const rows =
    data?.data?.map((role: Role) => ({
      id: role.id,
      name: i18n.language === "ar" ? role.name.ar : role.name.en,
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
      getRole(currentId).then((response) => {
        setCurrentRole(response.data);
      });
    }
  }, [currentId]);

  const handleEdit = (id: any) => {
    console.log("Edit:", id);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteRole.mutate(currentId, {
        onSuccess: () => {
          setOpenModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const handleAddClick = () => {
    setOpenCreateModal(true);
  };

  const handleCreateRole = (data: RoleRequest) => {
    createRole.mutate(data, {
      onSuccess: () => {
        setOpenCreateModal(false);
      },
      onError: (error: any) => {
        toast.error(`${t("modal.create_role_error")}: ${error.message}`);
      },
    });
  };

  const columns = getRoleColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) {
    toast.error(`Error: ${error.message}`, { autoClose: false });
  }

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.roles")} />
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
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.role")}
        itemId={currentId || 0}
      />
      <CustomModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title={t("modal.create_role")}
        onSubmit={handleCreateRole}
      >
        <RoleForm
          onSubmit={handleCreateRole}
          onClose={() => {
            setOpenCreateModal(false);
          }}
        />
      </CustomModal>
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_role")}
      >
        <ViewRoleModal role={currentRole} />
      </ViewModal>
    </div>
  );
};

export default Roles;
