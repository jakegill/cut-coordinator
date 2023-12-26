import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditSchedule() {
	const email = useSelector((state) => state.auth.email);

	const [schedule, setSchedule] = useState({
		days: {
			Sunday: false,
			Monday: false,
			Tuesday: false,
			Wednesday: false,
			Thursday: false,
			Friday: false,
			Saturday: false,
		},
		startTime: "",
		endTime: "",
	});

	const redirect = useNavigate();

	const handleScheduleChange = (day) => {
		setSchedule({
			...schedule,
			days: {
				...schedule.days,
				[day]: !schedule.days[day],
			},
		});
	};

	const handleTimeChange = (e) => {
		setSchedule({
			...schedule,
			[e.target.name]: e.target.value,
		});
	};

	const handleScheduleSubmit = (e) => {
		e.preventDefault();
		updateBarberSchedule({ schedule: { ...schedule }, email });
		redirect("/barber/profile");
	};

	const updateBarberSchedule = async (schedule) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/barber/${email}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(schedule),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to update barber schedule.");
			}
			return await response.json();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<div className='edit-container'>
				<Link className='return' to='/barber/profile'>
					Return
				</Link>
				<form className='schedule-form' onSubmit={handleScheduleSubmit}>
					<h2 className='form-title'>Edit Schedule</h2>
					<div className='edit-schedule-container'>
						<div className='days-container'>
							{Object.keys(schedule.days).map((day) => (
								<div className='input-day' key={day}>
									<input
										type='checkbox'
										id={day}
										checked={schedule.days[day]}
										onChange={() => handleScheduleChange(day)}
									/>
									<label htmlFor={day}>{day}</label>
								</div>
							))}
						</div>
						<div className='time-container'>
							<label className='time-label' htmlFor='startTime'>
								From
							</label>
							<input
								className='input-time'
								type='time'
								name='startTime'
								value={schedule.startTime}
								onChange={handleTimeChange}
							/>
							<label className='time-label' htmlFor='endTime'>
								To
							</label>
							<input
								className='input-time'
								type='time'
								name='endTime'
								value={schedule.endTime}
								onChange={handleTimeChange}
							/>
						</div>
						<button className='submit-button' type='submit'>
							Change
						</button>
					</div>
				</form>
				<NavbarBarber />
			</div>
		</>
	);
}
