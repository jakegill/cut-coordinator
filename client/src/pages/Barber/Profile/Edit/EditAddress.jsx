import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Edit.css";

export default function EditAddress() {
	const email = useSelector((state) => state.auth.email);

	const [location, setLocation] = useState({
		address: "",
		city: "",
		state: "",
	});

	const redirect = useNavigate();

	const handleAddressSubmit = (e) => {
		e.preventDefault();
		if (location.address && location.city && location.state) {
			updateBarberLocation({
				location: {
					address: location.address,
					city: location.city,
					state: location.state,
				},
				email,
			});
			redirect("/barber/profile");
		}
	};

	const updateBarberLocation = async (location) => {
		try {
			const response = await fetch(
				`${process.env.VITE_APP_API_URL}/api/barber/${email}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(location),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to update barber address.");
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
				<form onSubmit={handleAddressSubmit}>
					<h2 className='form-title'>Edit Address</h2>
					<div className='inputs'>
						<input
							required
							className='input-address'
							type='text'
							placeholder='Address'
							value={location.address}
							onChange={(e) =>
								setLocation({ ...location, address: e.target.value })
							}
						/>
						<div className='city-state'>
							<input
								required
								className='input-city-state'
								type='text'
								placeholder='City'
								value={location.city}
								onChange={(e) =>
									setLocation({ ...location, city: e.target.value })
								}
							/>
							<input
								required
								className='input-city-state'
								type='text'
								placeholder='State'
								value={location.state}
								onChange={(e) =>
									setLocation({ ...location, state: e.target.value })
								}
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
