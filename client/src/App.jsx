import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

import Barber from "./pages/Barber/Barber";
import Home from "./pages/Home/Home";
import {
  PrivateRouteClient,
  PrivateRouteBarber,
} from "./components/PrivateRoute/PrivateRoute";
import ClientHome from "./pages/Client/Home/Client";
import Settings from "./pages/Client/Settings/Settings";
import Appointments from "./pages/Client/Appointments/Appointments";
import Search from "./pages/Client/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/client" element={<PrivateRouteClient />}>
          <Route index element={<ClientHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/barber" element={<PrivateRouteBarber />}>
          <Route index element={<Barber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
