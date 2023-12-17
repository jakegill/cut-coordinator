import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import BarberHome from "./pages/Barber/Home/Barber";
import BarberSettings from "./pages/Barber/Settings/Settings";
import Schedule from "./pages/Barber/Schedule/Schedule";
import Profile from "./pages/Barber/Profile/Profile";
import {
  PrivateRouteClient,
  PrivateRouteBarber,
} from "./components/PrivateRoute/PrivateRoute";
import ClientHome from "./pages/Client/Home/Client";
import ClientSettings from "./pages/Client/Settings/Settings";
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
          <Route path="settings" element={<ClientSettings />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/barber" element={<PrivateRouteBarber />}>
          <Route index element={<BarberHome />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<BarberSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
