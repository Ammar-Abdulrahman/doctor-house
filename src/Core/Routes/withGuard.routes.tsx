import { RootState } from "Core/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const withGuards = (Component: any) => {
  const Wrapper = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? <Component /> : <Navigate to="/login" replace={true} />;
  };
  return Wrapper;
};

export default withGuards;
