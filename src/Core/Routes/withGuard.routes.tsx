import { Navigate } from "react-router-dom";

const withGuards = (Component: any) => {
  const Wrapper = () => {
    return sessionStorage.getItem("token") ? (
      <Component />
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };
  return Wrapper;
};

export default withGuards;
