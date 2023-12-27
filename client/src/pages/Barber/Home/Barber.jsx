import { get } from "mongoose";
import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Barber.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Barber() {
	const [activeDay, setActiveDay] = useState(new Date().getDay());
	const barberProfile = useSelector((state) => state.barberProfile);

	return (
		<>
			<section className='barber-home-container'>
				<h2 className='barber-title'>Home</h2>
				<div>
					<h4 className='barber-subtitle'>TODAYS SCHEDULE</h4>
					<div className='barber-today'>No appointments today</div>
				</div>
				<div>
					<h4 className='barber-subtitle'>ANALYTICS</h4>
					<div className='barber-analytics'>
						<div>
							<h5>Appointments</h5>
							<p>This week</p>
							<p>Last week</p>
							<p>This month</p>
							<p>Total appointments: {barberProfile.appointments.length}</p>
						</div>
						<div>
							<h5>Estimated Revenue</h5>
						</div>
					</div>
				</div>
			</section>
			<NavbarBarber />
		</>
	);
}
