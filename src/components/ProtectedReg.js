import { Navigate, Outlet } from "react-router-dom";
import parseJwt from "../utils/checkToken";

export default function ProtectedReg() {
  let auth = localStorage.getItem("token");
  if (auth !== null) {
    parseJwt(auth);
  }
  return auth !== null && auth !== "" ? <Navigate to="/home" /> : <Outlet />;
}
