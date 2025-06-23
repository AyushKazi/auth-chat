import { userAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function Wrapper() {
  const location = useLocation();
  const { session, isLoading } = userAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
