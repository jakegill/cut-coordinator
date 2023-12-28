import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function EditServices() {
	const email = useSelector((state) => state.auth.email);

	const [newService, setNewService] = useState({
		service: "",
		price: "",
	});

	const [currentServices, setCurrentServices] = useState({});

	const redirect = useNavigate();

	useEffect(() => {
		fetchCurrentServices();
	}, []);

	const handleRemoveClick = async (serviceId) => {
		await deleteBarberService(serviceId);
		fetchCurrentServices();
	};
	const handleServiceSubmit = (e) => {
		e.preventDefault();
		if (newService.service && newService.price) {
			updateBarberServices({ services: { ...newService }, email });
			redirect("/barber/profile");
		}
	};

	const updateBarberServices = async (newService) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/barber/${email}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newService),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to update barber services.");
			}
			return await response.json();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const deleteBarberService = async (serviceId) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/barber/${email}/service`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ serviceId }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete barber service.");
			}
			return await response.json();
			fetchCurrentServices();
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCurrentServices = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/barber/${email}`
			);
			if (!response.ok) {
				throw new Error("Failed to get barber services.");
			}
			const services = await response.json();
			setCurrentServices(services);
		} catch (error) {
			console.error(error);
		}
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
							required
							className='input-service'
							type='text'
							placeholder='Service'
							value={newService.service}
							onChange={(e) =>
								setNewService({ ...newService, service: e.target.value })
							}
						/>
						<input
							required
							className='input-service'
							type='text'
							placeholder='Price'
							value={newService.price}
							onChange={(e) =>
								setNewService({ ...newService, price: e.target.value })
							}
						/>
						<button className='submit-button' type='submit'>
							Add
						</button>
					</div>
				</form>
				<h2 className='form-title'>Remove Services</h2>
				<div className='remove-services-container'>
					{currentServices.services
						? currentServices.services.map((service) => (
								<div className='remove-service' key={service._id}>
									<div>
										<p>{service.service}</p>
										<p>{service.price}</p>
									</div>
									<p
										onClick={() => {
											handleRemoveClick(service._id);
										}}
										className='remove-service-button'
									>
										Remove
									</p>
								</div>
							))
						: null}
				</div>
				<NavbarBarber />
			</div>
		</>
	);
}
