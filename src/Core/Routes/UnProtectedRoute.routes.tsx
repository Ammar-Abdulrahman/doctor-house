import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "Core/store";

const UnProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;
