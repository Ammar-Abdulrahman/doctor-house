import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from "@Services/apiService";
import { RoleResponse, RoleRequest, Role, SingleRoleResponse } from "@Types/Roles";

const useRoles = (
  needPagination: boolean
  //   pageSize: number = 10,
  //   page: number = 1
) => {
  const queryClient = useQueryClient();

  const getRoles = () =>
    useQuery<RoleResponse, Error>(
      ["roles"],
      () =>
        fetchData<RoleResponse>(
          `/roles?needPagination=${needPagination}`
        ),
      {
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

    // const getRole = (id: number) =>
    //   useQuery<SingleRoleResponse, Error>(["role", id], () =>
    //     fetchData<SingleRoleResponse>(`/roles/${id}`)
    //   );

    const getRole = (id: number) => fetchData<SingleRoleResponse>(`/roles/${id}`);

    
    const createRole = useMutation(
      (newRole: RoleRequest) => postData("/roles", newRole),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("roles");
        },
      }
    );

    const updateRole = useMutation(
      (role: RoleRequest & { id: number }) => updateData(`/roles/${role.id}`, role),
      {
        onSuccess: (_,role) => {
          queryClient.invalidateQueries(["role", role.id]);
        },
      }
    );

    const deleteRole = useMutation((id: number) => deleteData(`/roles/${id}`), {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
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
