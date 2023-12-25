import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBarberProfile } from "../../../../redux/profile/barberSlice.js";

export default function Profile() {
	const auth = useSelector((state) => state.auth);
	const barberProfile = useSelector((state) => state.barberProfile);
	const dispatch = useDispatch();

	const fetchBarberData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/barber/${auth.email}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch barber details");
			}
			const barberData = await response.json();
			dispatch(setBarberProfile(barberData));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBarberData();
	}, []);

	return (
		<>
			<section className='profile-container'>
				<header className='profile-header'>
					<img
						className='profile-img'
						src={barberProfile.profilePicture}
						alt='avatar'
					/>
					<h3 className='profile-name'>{`${auth.firstName} ${auth.lastName}`}</h3>
				</header>
				<div>
					<h4 className='profile-subtitle'>ADDRESS</h4>
					{barberProfile.location ? (
						<address className='profile-address'>{`${barberProfile.location.address}, ${barberProfile.location.city}, ${barberProfile.location.state}`}</address>
					) : null}
				</div>
				<div>
					<h4 className='profile-subtitle'>SCHEDULE</h4>
					{barberProfile.schedule ? (
						<time className='profile-schedule'>
							{Object.entries(barberProfile.schedule.days)
								.filter(([, value]) => value)
								.map(([key]) => key)
								.join(", ")}
							{`. From ${barberProfile.schedule.startTime} to ${barberProfile.schedule.endTime}`}
						</time>
					) : null}
				</div>
				<div>
					<h4 className='profile-subtitle'>SERVICES</h4>
					{barberProfile.services ? (
						<ul className='profile-services'>
							{barberProfile.services.map((service, index) => (
								<li key={index}>{`${service.service}: ${service.price}`}</li>
							))}
						</ul>
					) : null}
				</div>
				<div>
					<h4 className='profile-subtitle'>PORTFOLIO</h4>
					{barberProfile.portfolio && barberProfile.portfolio.length > 0 ? (
						<div className='profile-portfolio'>
							{barberProfile.portfolio.map((imageUrl, index) => (
								<img
									key={index}
									src={imageUrl}
									alt={`Portfolio image ${index + 1}`}
									className='portfolio-image'
								/>
							))}
						</div>
					) : (
						<p>No portfolio images available.</p>
					)}
				</div>
				<Link to='edit' className='profile-edit-button'>
					Edit Profile
				</Link>
			</section>
			<NavbarBarber />
		</>
	);
}
