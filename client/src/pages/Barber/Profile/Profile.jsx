import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBarberProfile } from "../../../../redux/profile/barberSlice.js";
import { ClipLoader } from "react-spinners";
import "./Profile.css";
import { set } from "mongoose";

export default function Profile() {
	const auth = useSelector((state) => state.auth);
	const barberProfile = useSelector((state) => state.barberProfile);
	const [isLoading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchBarberData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3000/api/barber/${auth.email}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch barber details");
			}
			const barberData = await response.json();
			dispatch(setBarberProfile(barberData));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchBarberData();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='barber-profile-spinner-container'>
					<ClipLoader
						loading={isLoading}
						size={`20vh`}
						color={`var(--primary)`}
					/>
				</div>
			) : (
				<section className='profile-container'>
					<header className='profile-header'>
						<Link
							to='edit/pfp'
							className='subtitle-header profile-header-container'
						>
							<img
								className='profile-img'
								src={barberProfile.profilePicture}
								alt='avatar'
							/>
							<div>EDIT PICTURE</div>
						</Link>
					</header>
					<div>
						<div className='subtitle-container'>
							<h4 className='profile-subtitle'>ADDRESS</h4>
							<Link to='edit/address' className='subtitle-edit'>
								EDIT ADDRESS
							</Link>
						</div>
						{barberProfile.location ? (
							<address className='profile-address'>{`${barberProfile.location.address}, ${barberProfile.location.city}, ${barberProfile.location.state}`}</address>
						) : null}
					</div>
					<div>
						<div className='subtitle-container'>
							<h4 className='profile-subtitle'>SCHEDULE</h4>
							<Link to='edit/schedule' className='subtitle-edit'>
								EDIT SCHEDULE
							</Link>
						</div>
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
						<div className='subtitle-container'>
							<h4 className='profile-subtitle'>SERVICES</h4>
							<Link to='edit/services' className='subtitle-edit'>
								EDIT SERVICES
							</Link>
						</div>
						{barberProfile.services ? (
							<ul className='profile-services'>
								{barberProfile.services.map((service, index) => (
									<li key={index}>{`${service.service}: ${service.price}`}</li>
								))}
							</ul>
						) : null}
					</div>
					<div>
						<div className='subtitle-container'>
							<h4 className='profile-subtitle'>PORTFOLIO</h4>
							<Link to='edit/portfolio' className='subtitle-edit'>
								EDIT PORTFOLIO
							</Link>
						</div>
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
				</section>
			)}
			<NavbarBarber />
		</>
	);
}
