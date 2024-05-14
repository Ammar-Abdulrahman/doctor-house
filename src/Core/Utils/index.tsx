export const getPermissionKeys = (): string[] => {
  const permissions = sessionStorage.getItem("privileges");
  if (!permissions) {
    return [];
  }

  const parsedPermissions = JSON.parse(permissions);
  return parsedPermissions.map((privilege: any) => privilege.key);
};

export const hasPermission = (requiredPermission: string): boolean => {
  const permissionKeys = getPermissionKeys();
  return permissionKeys.includes(requiredPermission);
};
