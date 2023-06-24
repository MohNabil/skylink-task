import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useAuth();
  const storageToken = localStorage.getItem("token");
  const location = useLocation();

  return token || storageToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
