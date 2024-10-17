import React from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import EnhancedTable from "@Components/Table";
import { getRoleColumns } from "./Helper";
import ConfirmationModal from "@Components/Modal/ConfirmationModal/index";
import CustomModal from "@Components/Modal/CreateModal";
import ViewModal from "@Components/Modal/ViewModal";
import PageLoader from "@Components/Loader/PageLoader";
import AddButton from "@Components/Button/Add";
import { Grid, IconButton } from "@mui/material";
import RoleForm from "./Components/RoleForm";
import ViewRoleModal from "./Components/ViewRole";
import RefreshIcon from "@mui/icons-material/Refresh";
import useRolesContainer from "./Container/useRolesContainer";
import { useLocale } from "@Context/LanguageContext";
import SkeletonTable from "@Components/Skeleton/Table";

const Roles: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const {
    rows,
    isError,
    isLoading,
    isRefetching,
    error,
    currentId,
    confirmDelete,
    currentRole,
    handleDelete,
    handleAddClick,
    handleCreateRole,
    handleEdit,
    handleRefetch,
    handleView,
    openCreateModal,
    openEditModal,
    openModal,
    openViewModal,
    setOpenCreateModal,
    setOpenEditModal,
    setOpenModal,
    setOpenViewModal,
  } = useRolesContainer();

  const columns = getRoleColumns(t, handleDelete, handleView, handleEdit);

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
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
      {isLoading ? (
        <SkeletonTable />
      ) : !isLoading && isRefetching ? (
        <PageLoader />
      ) : (
        <EnhancedTable rows={rows} columns={columns} />
      )}
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
