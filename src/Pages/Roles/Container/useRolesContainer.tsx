import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useRoles from "@Hooks/useRoles";
import { Role, RoleRequest } from "@Types/Roles";
import { useLocale } from "@Context/LanguageContext";

const useRolesContainer = () => {
  const { i18n } = useTranslation();
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
  const {locale} =useLocale()

  const rows =
    data?.data?.map((role: Role) => ({
      id: role.id,
      name: locale === "ar" ? role.name.ar : role.name.en,
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
    });
  };

  return {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    openModal,
    openCreateModal,
    openEditModal,
    openViewModal,
    currentRole,
    currentId,
    handleRefetch,
    handleDelete,
    handleAddClick,
    handleView,
    handleEdit,
    confirmDelete,
    handleCreateRole,
    setOpenModal,
    setOpenViewModal,
    setOpenEditModal,
    setOpenCreateModal
  };
};
export default useRolesContainer;
