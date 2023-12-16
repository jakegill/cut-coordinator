import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouteClient() {
  const accountType = useSelector((state) => state.auth.accountType);

  if (accountType === "client") {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
}

export function PrivateRouteBarber() {
  const accountType = useSelector((state) => state.auth.accountType);

  if (accountType === "barber") {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
}
