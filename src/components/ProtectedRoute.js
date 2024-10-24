import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  let auth = localStorage.getItem("token");
  return auth !== "" ? <Outlet /> : <Navigate to="/" />;
}
