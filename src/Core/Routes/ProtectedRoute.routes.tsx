import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermission } from '@Utils/index'

interface ProtectedRouteProps {
  requiredPermission: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  children,
}) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (hasPermission(requiredPermission)) {
    return <>{children}</>;

  }

  return <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
