import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Schedule.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Schedule() {
	const barberProfile = useSelector((state) => state.barberProfile);
	const [activeDay, setActiveDay] = useState(new Date().getDay());
	const [currentDate, setCurrentDate] = useState(new Date());

	const getWeekDates = (date) => {
		const dayOfWeek = date.getDay();
		const currentMonth = date.toLocaleString("default", { month: "long" });
		const currentYear = date.getFullYear();
		const currentDate = date.getDate();
		let weekDates = [];

		for (let i = 0; i < 7; i++) {
			const newDate = new Date(date);
			newDate.setDate(currentDate - dayOfWeek + i);
			weekDates.push(newDate.getDate());
		}

		return { currentMonth, currentYear, weekDates };
	};

	const { currentMonth, currentYear, weekDates } = getWeekDates(currentDate);
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const formatSelectedDate = (dayIndex) => {
		const selectedDate = new Date(currentDate);
		selectedDate.setDate(
			currentDate.getDate() - currentDate.getDay() + dayIndex
		);
		return `${selectedDate.toLocaleString("default", {
			month: "long",
		})} ${selectedDate.getDate()}`;
	};

	const getFormattedAppointments = (dayIndex) => {
		const selectedDateString = formatSelectedDate(dayIndex);
		return barberProfile.appointments.filter((appointment) => {
			const [appointmentDay, appointmentDate] = appointment.date.split(", ");
			return appointmentDate === selectedDateString;
		});
	};

	const handleDayClick = (dayIndex) => {
		setActiveDay(dayIndex);
		const appointmentsForDay = getFormattedAppointments(dayIndex);
	};

	const handlePrevWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() - 7);
		setCurrentDate(newDate);
	};

	const handleNextWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + 7);
		setCurrentDate(newDate);
	};

	const selectedDayAppointments = getFormattedAppointments(activeDay);
	console.log(selectedDayAppointments);
	return (
		<>
			<section className='schedule-container'>
				<h2 className='schedule-title'>Schedule</h2>
				<div className='calendar'>
					<div className='month-year'>{`${currentMonth.toUpperCase()} ${currentYear}`}</div>
					<div className='week-days'>
						{daysOfWeek.map((day, index) => (
							<div key={day} onClick={() => handleDayClick(index)}>
								<div className='day'>{day}</div>
								<div className={`day ${index === activeDay ? "active" : ""}`}>
									{weekDates[index]}
								</div>
							</div>
						))}
					</div>
					<div className='calendar-navigate-container'>
						<svg
							onClick={handlePrevWeek}
							xmlns='http://www.w3.org/2000/svg'
							height='24'
							width='21'
							viewBox='0 0 448 512'
						>
							<path
								fill='var(--lightest)'
								d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
							/>
						</svg>
						<svg
							onClick={handleNextWeek}
							xmlns='http://www.w3.org/2000/svg'
							height='24'
							width='21'
							viewBox='0 0 448 512'
						>
							<path
								fill='var(--lightest)'
								d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z'
							/>
						</svg>
					</div>
				</div>
				<div className='appointments-section'>
					{selectedDayAppointments.length > 0 ? (
						selectedDayAppointments.map((appointment, index) => (
							<div key={index} className='schedule-appointment-card'>
								<h3 className='appointment-card-name'>{`${appointment.clientFirstName} ${appointment.clientLastName}`}</h3>
								<p className='appointment-card-text'>{appointment.service}</p>
								<time className='appointment-card-text'>
									{appointment.time}
								</time>
							</div>
						))
					) : (
						<p className='no-appointments'>No appointments</p>
					)}
				</div>
			</section>

			<NavbarBarber />
		</>
	);
}
