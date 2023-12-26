import { get } from "mongoose";
import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Barber.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Barber() {
	const [activeDay, setActiveDay] = useState(new Date().getDay());
	const barberProfile = useSelector((state) => state.barberProfile);

	const getTodaysAppointments = barberProfile.appointments.filter(
		(appointment) => {
			const appointmentDate = new Date(appointment.date);
			return appointmentDate.getDay() === activeDay;
		}
	);

	console.log(getTodaysAppointments);

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
					<div className='barber-requests'>No pending requests</div>
				</div>
			</section>
			<NavbarBarber />
		</>
	);
}
