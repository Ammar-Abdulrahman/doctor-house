import store from "Core/store";

export const getPermissionKeys = (): string[] => {
  const state = store.getState();
  const privileges = state.auth?.privileges;

  if (!privileges) {
    return [];
  }

  return privileges.map((privilege: any) => privilege.key);
};

export const hasPermission = (requiredPermission: string): boolean => {
  const permissionKeys = getPermissionKeys();
  return permissionKeys.includes(requiredPermission);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

interface ProtectedRouteProps {
  requiredPermission: string;
  children: React.ReactNode;
}

export const ProtectedFeature: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  children,
}) => {
  if (hasPermission(requiredPermission)) {
    return <>{children}</>;
  }

  return null;
};
