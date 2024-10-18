import React from "react";
import { Navigate } from "react-router-dom";
import { hasPermission } from "@Utils/index";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  children,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const privileges = useSelector((state: RootState) => state.auth.privileges);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!privileges || hasPermission(requiredPermission)) {
    return <>{children}</>;
  }

  return <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
