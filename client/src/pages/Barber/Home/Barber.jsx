import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import "./Barber.css";

export default function Barber() {
	const [activeDay, setActiveDay] = useState(new Date().getDay());
	const [todaysAppointments, setTodaysAppointments] = useState([]);
	const barberProfile = useSelector((state) => state.barberProfile);

	useEffect(() => {
		const todayFormatted = format(new Date(), "MMMM d");
		const filteredAppointments = barberProfile.appointments.filter(
			(appointment) => {
				const [_, appointmentDate] = appointment.date.split(", ");
				return appointmentDate === todayFormatted;
			}
		);
		setTodaysAppointments(filteredAppointments);
	}, []);

	const calcTotalRevenue = () => {
		let totalRevenue = 0;
		barberProfile.appointments.forEach((appointment) => {
			if (appointment.price.startsWith("$")) {
				const correctedPrice = Number(appointment.price.substring(1));
				totalRevenue += correctedPrice;
			} else {
				totalRevenue += Number(appointment.price);
			}
		});
		return totalRevenue;
	};

	const totalRevenue = calcTotalRevenue();

	return (
		<>
			<section className='barber-home-container'>
				<h2 className='barber-title'>Home</h2>
				<div>
					<h4 className='barber-subtitle'>TODAYS SCHEDULE</h4>
					<div className='barber-today'>
						{todaysAppointments.length > 0 ? (
							<p>{todaysAppointments.length} appointments today</p>
						) : (
							<p>No appointments today</p>
						)}
					</div>
				</div>
				<div>
					<h4 className='barber-subtitle'>ANALYTICS</h4>
					<div className='barber-analytics'>
						<div>
							<h5 className='analytics-subtitle'>Clients</h5>
							<p className='analytics-text'>
								Total clients: {barberProfile.clients.length}
							</p>
						</div>
						<div>
							<h5 className='analytics-subtitle'>Estimated Revenue</h5>
							<p className='analytics-text'>Total revenue: ${totalRevenue}</p>
						</div>
						<div>
							<h5 className='analytics-subtitle'>Appointments</h5>
							<p className='analytics-text'>
								Total appointments: {barberProfile.appointments.length}
							</p>
						</div>
					</div>
				</div>
			</section>
			<NavbarBarber />
		</>
	);
}
