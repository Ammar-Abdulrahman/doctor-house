import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import {
  RoleResponse,
  RoleRequest,
  Role,
  SingleRoleResponse,
} from "@Types/Roles";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useRoles = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getRoles = () =>
    useQuery<RoleResponse, Error>(
      ["roles"],
      () => fetchData<RoleResponse>(`/roles?needPagination=${needPagination}`),
      {
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

  const getRole = (id: number) => fetchData<SingleRoleResponse>(`/roles/${id}`);

  const createRole = useMutation(
    (newRole: RoleRequest) => postData("/roles", newRole),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
        toast.success(`${t("modal.success_create_role")}`);
      },
    }
  );

  const updateRole = useMutation(
    (role: RoleRequest & { id: number }) =>
      updateData(`/roles/${role.id}`, role),
    {
      onSuccess: (_, role) => {
        queryClient.invalidateQueries(["role", role.id]);
        queryClient.invalidateQueries("roles");
        toast.success(`${t("modal.success_edit_role")}`);
      },
    }
  );

  const deleteRole = useMutation((id: number) => deleteData(`/roles/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
      toast.success(`${t("modal.delete_role")}`);
    },
  });

  return {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
  };
};

export default useRoles;
