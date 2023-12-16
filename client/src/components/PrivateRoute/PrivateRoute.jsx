import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouter() {
  const accountType = useSelector((state) => state.auth.accountType);

  if (accountType === "client") {
    return <Navigate to="/client" />;
  } else if (accountType === "barber") {
    return <Navigate to="/barber" />;
  } else {
    return <Navigate to="/signin" />;
  }
}
