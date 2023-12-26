import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import "./Client.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setClientProfile } from "../../../../redux/profile/clientSlice";

export default function ClientHome() {
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.clientProfile);
	const [profilePicture, setProfilePicture] = useState(null);
	const [savedBarbers, setSavedBarbers] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePfpClick = () => {
		//open modal
		const dialog = document.querySelector("dialog");
		dialog.showModal();
	};

	const handleDialogClose = () => {
		const dialog = document.querySelector("dialog");
		dialog.close();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfilePicture(file);
		}
	};

	const handlePfpSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", profilePicture);
		console.log("formData:", formData);
		try {
			const response = await fetch(
				`http://localhost:3000/api/gcs/${auth.email}/uploadClientProfile`,
				{
					method: "POST",
					body: formData,
				}
			);
			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message);
			}
			const result = await response.json();
			console.log("Profile picture uploaded:", result.imgUrl);
			setProfilePicture(null);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleBookAppointmentClick = (barber) => {
		navigate("/client/search/book", { state: { barber } });
	};

	const handleUnsaveClick = async (barberEmail) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/client/${auth.email}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						barberEmail,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to unsave barber");
			}
			const updatedClientData = await response.json();
			await fetchClientData();
			await fetchSavedBarbersData();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchClientData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/client/${auth.email}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch client details");
			}
			const clientData = await response.json();
			const dispatchData = {
				profilePicture: clientData.profilePicture,
				barbers: clientData.barbers || [],
			};
			dispatch(setClientProfile(dispatchData));
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSavedBarbersData = async () => {
		try {
			const barberDataPromises = profile.barbers.map((barberEmail) =>
				fetch(`http://localhost:3000/api/barber/${barberEmail}`).then((res) =>
					res.json()
				)
			);
			const barberData = await Promise.all(barberDataPromises);
			setSavedBarbers(barberData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchClientData();
		fetchSavedBarbersData();
	}, []);

	return (
		<>
			<section className='client-container'>
				<dialog className='dialog-container'>
					<div className='dialog-close' onClick={handleDialogClose}>
						CANCEL
					</div>
					<form onSubmit={handlePfpSubmit} className='dialog-form'>
						<label className='dialog-label'>Edit Profile Picture:</label>
						<input
							onChange={handleFileChange}
							className='dialog-input'
							type='file'
							accept='image/*'
						/>
						<button className='dialog-submit' type='submit'>
							Change
						</button>
					</form>
				</dialog>
				<h3 className='client-name'>{`${auth.firstName} ${auth.lastName}`}</h3>
				<img
					onClick={handlePfpClick}
					className='client-img'
					src={profile.profilePicture}
					alt='avatar'
				/>

				<main>
					<header className='client-main-header'>
						<h3 className='client-subtitle'>MY BARBERS</h3>
					</header>
					<div>
						{profile.barbers.length === 0 ? (
							<>
								<div className='no-barbers-container'>
									<p className='no-barbers'>No saved barbers!</p>
									<Link className='no-barbers-button' to='/client/search'>
										Find Barbers
									</Link>
								</div>
							</>
						) : (
							<div className='client-barbers-container'>
								{savedBarbers.map((barber) => (
									<div className='barber-card-client-home' key={barber._id}>
										<div className='barber-card-top-container'>
											<img
												className='barber-card-pfp'
												src={`${barber.profilePicture}`}
												alt=''
											/>
											<div>
												<h3 className='barber-card-name'>{`${barber.firstName} ${barber.lastName}`}</h3>
												<p className='barber-card-location'>
													{barber.location
														? `${barber.location.city}, ${barber.location.state}`
														: "Location unavailable"}
												</p>
											</div>
										</div>
										<div className='barber-card-portfolio'>
											{barber.portfolio && barber.portfolio.length > 0 ? (
												barber.portfolio.map((imageUrl, index) => (
													<img
														key={index}
														src={imageUrl}
														alt={`Portfolio image ${index + 1}`}
														className='barber-portfolio-image'
													/>
												))
											) : (
												<p>No portfolio images available.</p>
											)}
										</div>
										{console.log(barber)}
										<button
											onClick={() => handleBookAppointmentClick(barber)}
											className='barber-card-button'
										>
											BOOK APPOINTMENT
										</button>
										<button
											onClick={() => handleUnsaveClick(barber.email)}
											className='client-button-remove'
										>
											UNSAVE BARBER
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</main>
			</section>

			<NavbarClient />
		</>
	);
}
