import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditServices() {
	const email = useSelector((state) => state.auth.email);

	const [services, setServices] = useState({
		service: "",
		price: "",
	});

	const handleServiceSubmit = (e) => {
		e.preventDefault();
		updateBarberDetails({ services: { ...services }, email });
	};

	return (
		<>
			<div className='edit-container'>
				<Link className='return' to='/barber/profile'>
					Return
				</Link>
				<form className='service-form' onSubmit={handleServiceSubmit}>
					<h2 className='form-title'>Add Services</h2>
					<div className='inputs'>
						<input
							className='input-service'
							type='text'
							placeholder='Service'
							value={services.service}
							onChange={(e) =>
								setServices({ ...services, service: e.target.value })
							}
						/>
						<input
							className='input-service'
							type='text'
							placeholder='Price'
							value={services.price}
							onChange={(e) =>
								setServices({ ...services, price: e.target.value })
							}
						/>
						<button className='submit-button' type='submit'>
							Add
						</button>
					</div>
				</form>
				<NavbarBarber />
			</div>
		</>
	);
}
