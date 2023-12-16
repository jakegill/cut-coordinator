import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Client from "./pages/Client/Client";
import Barber from "./pages/Barber/Barber";
import Home from "./pages/Home/Home";
import PrivateRouter from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRouter />}>
          <Route path="/client" element={<Client />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/barber" element={<Barber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
