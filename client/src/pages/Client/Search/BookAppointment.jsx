import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./BookAppointment.css";

export default function BookAppointment() {
	const currentClient = useSelector((state) => state.auth);
	const location = useLocation();
	const [barber, setBarber] = useState(location.state.barber);
	const [activeDay, setActiveDay] = useState(null);
	const [selectedService, setSelectedService] = useState("");
	const [selectedServicePrice, setSelectedServicePrice] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [currentDate, setCurrentDate] = useState(new Date());
	const redirect = useNavigate();

	useEffect(() => {
		if (barber.services && barber.services.length > 0) {
			setSelectedService(barber.services[0].service);
			setSelectedServicePrice(barber.services[0].price);
		}
	}, [barber.services]);

	const handleDayClick = (dayIndex, dayOfWeek, dayNumber, month) => {
		setActiveDay(dayIndex);
		const formattedDate = `${dayOfWeek}, ${month} ${dayNumber}`;
		setSelectedDate(formattedDate);

		const dayName = convertDay(daysOfWeek[dayIndex]);
		if (barber.schedule.days[dayName]) {
			const timeSlots = generateTimeSlots(
				barber.schedule.startTime,
				barber.schedule.endTime,
				formattedDate
			);
			if (timeSlots.length > 0) {
				setSelectedTime(timeSlots[0]);
			} else {
				setSelectedTime("");
			}
		}
	};

	const handleServiceChange = (service) => {
		setSelectedService(service.service);
		setSelectedServicePrice(service.price);
	};

	const handleAppointmentSubmit = async () => {
		if (
			!selectedService ||
			!selectedDate ||
			!selectedTime ||
			!barber.schedule.days[convertDay(daysOfWeek[activeDay])]
		) {
			alert(
				"Please select a valid service, date, and time for your appointment."
			);
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:3000/api/appointments/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						barberEmail: barber.email,
						clientEmail: currentClient.email,
						service: selectedService,
						price: selectedServicePrice,
						time: selectedTime,
						date: selectedDate,
						clientFirstName: currentClient.firstName,
						clientLastName: currentClient.lastName,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to create appointment");
			}
			redirect("/client/appointments");
		} catch (error) {
			console.error("Error:", error);
		}
	};

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

	const convertDay = (day) => {
		const daysMap = {
			SUN: "Sunday",
			MON: "Monday",
			TUE: "Tuesday",
			WED: "Wednesday",
			THU: "Thursday",
			FRI: "Friday",
			SAT: "Saturday",
		};
		return daysMap[day];
	};

	const generateTimeSlots = (startTime, endTime, date) => {
		const start = parseInt(startTime.split(":")[0], 10);
		const end = parseInt(endTime.split(":")[0], 10);

		const [dayName, monthDay] = date.split(", ");
		const [month, day] = monthDay.split(" ");
		const formattedDate = `${monthDay}`;
		let bookedTimes = new Set();
		barber.appointments.forEach((appointment) => {
			const [appointmentDay, appointmentDate] = appointment.date.split(", ");
			if (appointmentDate === formattedDate) {
				bookedTimes.add(appointment.time);
			}
		});

		const timeSlots = [];
		for (let hour = start; hour < end; hour++) {
			for (let min = 0; min < 60; min += 30) {
				let period = hour >= 12 ? "PM" : "AM";
				let formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
				const time =
					formattedHour.toString().padStart(2, "0") +
					":" +
					min.toString().padStart(2, "0") +
					" " +
					period;

				if (!bookedTimes.has(time)) {
					timeSlots.push(time);
				}
			}
		}
		return timeSlots;
	};

	const handlePrevWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() - 7);
		setCurrentDate(newDate);
		setActiveDay(null);
	};

	const handleNextWeek = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + 7);
		setCurrentDate(newDate);
		setActiveDay(null);
	};

	const isDateInPast = (dayIndex, month, year) => {
		const selectedDate = new Date(`${month} ${weekDates[dayIndex]}, ${year}`);
		return selectedDate < new Date();
	};

	return (
		<>
			<div className='book-container'>
				<Link className='book-return' to='/client/search'>
					Return
				</Link>
				<header className='book-header'>
					<img className='book-pfp' src={barber.profilePicture} alt='' />
					<div>
						<h2 className='book-name'>{`${barber.firstName} ${barber.lastName}`}</h2>
						<address className='book-location'>{`${barber.location.address}, ${barber.location.city} ${barber.location.state}`}</address>
					</div>
				</header>
				<main className='book-main-container'>
					<div className='book-services-container'>
						<h3 className='book-subtitle'>SELECT SERVICE</h3>
						<form action=''>
							{barber.services.map((service, index) => (
								<div className='book-service' key={index}>
									<input
										required
										type='radio'
										id={`service-${index}`}
										name='service'
										value={service.service}
										onChange={() => handleServiceChange(service)}
										checked={selectedService === service.service}
									/>
									<label className='book-service' htmlFor={`service-${index}`}>
										<p className='book-service-price'>{service.price}</p>
										<h4 className='book-service-name'>{service.service}</h4>
									</label>
								</div>
							))}
						</form>
					</div>
					<div className='book-calendar-container'>
						<h3 className='book-subtitle'>SELECT DATE</h3>
						<div className='calendar'>
							<div className='month-year'>{`${currentMonth.toUpperCase()} ${currentYear}`}</div>
							<div className='week-days'>
								{daysOfWeek.map((day, index) => (
									<div
										key={day}
										className={`day ${
											isDateInPast(index, currentMonth, currentYear)
												? "past-date"
												: ""
										}`}
										onClick={() =>
											handleDayClick(index, day, weekDates[index], currentMonth)
										}
									>
										<div>{day}</div>
										<div className={`${index === activeDay ? "active" : ""}`}>
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
					</div>
					<div className='book-time-container'>
						{daysOfWeek.map((day, index) => {
							if (index === activeDay) {
								const dayName = convertDay(day);
								if (barber.schedule.days[dayName]) {
									const timeSlots = generateTimeSlots(
										barber.schedule.startTime,
										barber.schedule.endTime,
										selectedDate
									);
									if (timeSlots.length > 0) {
										return (
											<div key={day}>
												<h4 className='book-subtitle'>SELECT TIME</h4>
												<select
													className='book-select-time'
													value={selectedTime}
													onChange={(e) => setSelectedTime(e.target.value)}
												>
													{timeSlots.map((time, i) => (
														<option key={i} value={time}>
															{time}
														</option>
													))}
												</select>
											</div>
										);
									} else {
										return (
											<p className='no-appointments' key={day}>
												No appointments available on {selectedDate}.
											</p>
										);
									}
								} else {
									return (
										<p className='no-appointments' key={day}>
											No appointments available on {selectedDate}.
										</p>
									);
								}
							}
							return null;
						})}
					</div>
					<button
						className='book-button'
						onClick={handleAppointmentSubmit}
						disabled={
							!selectedService ||
							!selectedDate ||
							!selectedTime ||
							!barber.schedule.days[convertDay(daysOfWeek[activeDay])]
						}
					>
						Schedule Appointment
					</button>
				</main>
			</div>
		</>
	);
}
