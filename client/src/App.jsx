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
import BookAppointment from "./pages/Client/Search/BookAppointment";
import EditAddress from "./pages/Barber/Profile/Edit/EditAddress";
import EditPortfolio from "./pages/Barber/Profile/Edit/EditPortfolio";
import EditSchedule from "./pages/Barber/Profile/Edit/EditSchedule";
import EditServices from "./pages/Barber/Profile/Edit/EditServices";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/client' element={<PrivateRouteClient />}>
					<Route index element={<ClientHome />} />
					<Route path='settings' element={<ClientSettings />} />
					<Route path='appointments' element={<Appointments />} />
					<Route path='search' element={<Search />} />
					<Route path='search/book' element={<BookAppointment />} />
				</Route>
				<Route path='/barber' element={<PrivateRouteBarber />}>
					<Route index element={<BarberHome />} />
					<Route path='schedule' element={<Schedule />} />
					<Route path='profile' element={<Profile />} />
					<Route path='profile/edit/address' element={<EditAddress />} />
					<Route path='profile/edit/portfolio' element={<EditPortfolio />} />
					<Route path='profile/edit/schedule' element={<EditSchedule />} />
					<Route path='profile/edit/services' element={<EditServices />} />
					<Route path='settings' element={<BarberSettings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
