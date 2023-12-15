import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Client from "./pages/Client/Client";
import Barber from "./pages/Barber/Barber";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/client" element={<Client />} />
        <Route path="/barber" element={<Barber />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
