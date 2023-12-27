import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Settings.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset as resetAuth } from "../../../../redux/auth/authSlice.js";
import { reset as resetBarberProfile } from "../../../../redux/profile/barberSlice.js";
import { reset as resetClientProfile } from "../../../../redux/profile/clientSlice.js";
import { persistor } from "../../../../redux/store.js";

export default function Settings() {
	const dispatch = useDispatch();
	const redirect = useNavigate();

	const handleSignoutClick = async () => {
		dispatch(resetAuth());
		dispatch(resetBarberProfile());
		dispatch(resetClientProfile());

		await persistor.purge();

		redirect("/signin");
	};

	return (
		<>
			<section className='settings-container'>
				<div className='settings-title'>
					<h2>Settings</h2>
				</div>
				<ul className='settings-list'>
					<li onClick={handleSignoutClick} className='sign-out'>
						Sign out
					</li>
				</ul>
			</section>
			<NavbarBarber />
		</>
	);
}
