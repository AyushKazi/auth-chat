// src/components/AuthRedirect.tsx
import { userAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRedirect() {
  const { session, isLoading } = userAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  // If user is logged in, redirect them away from login/signup
  if (session) {
    return <Navigate to={location.state?.from || "/dashboard"} replace />;
  }

  return <Outlet />;
}
