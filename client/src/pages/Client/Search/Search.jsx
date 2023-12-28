import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./Search.css";

export default function Search() {
	const [barbers, setBarbers] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();

	const handleBookAppointmentClick = (barber) => {
		navigate("/client/search/book", { state: { barber } });
	};

	const fetchBarbers = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.VITE_APP_API_URL}/api/barber/getAllBarbers`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch barbers");
			}
			const everyBarber = await response.json();
			setBarbers(everyBarber);
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBarbers();
	}, []);

	const handleSearchInputChange = (e) => {
		setSearchInput(e.target.value.toLowerCase());
	};

	const filteredBarbers = barbers.filter((barber) =>
		barber.firstName.toLowerCase().includes(searchInput)
	);

	return (
		<>
			<section className='search-container'>
				<div className='search-title'></div>
				<input
					type='text'
					className='search-bar'
					placeholder='Find barbers...'
					onChange={handleSearchInputChange}
				/>
				<main className='barber-search-container'>
					{isLoading ? (
						<div className='client-search-spinner-container'>
							<ClipLoader
								loading={isLoading}
								size={"12vh"}
								color={"var(--primary)"}
							/>
						</div>
					) : (
						filteredBarbers.map((barber) => (
							<div className='barber-card' key={barber._id}>
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
								<button
									onClick={() => handleBookAppointmentClick(barber)}
									className='barber-card-button'
								>
									BOOK APPOINTMENT
								</button>
							</div>
						))
					)}
				</main>
			</section>
			<NavbarClient></NavbarClient>
		</>
	);
}
