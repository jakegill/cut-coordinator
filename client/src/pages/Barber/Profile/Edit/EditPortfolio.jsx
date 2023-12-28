import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function EditPortfolio() {
	const email = useSelector((state) => state.auth.email);

	const currentBarber = useSelector((state) => state.barberProfile);

	const [image, setImage] = useState(null);
	const [currentPhotos, setCurrentPhotos] = useState(currentBarber.portfolio);

	const redirect = useNavigate();

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleImageUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", image);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/gcs/${email}/uploadPortfolio`,
				{
					method: "POST",
					body: formData,
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload image");
			}
			const result = await response.json();
			redirect("/barber/profile");
			setImage(null);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleImageDelete = async (photo) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/gcs/${email}/deleteImg`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ photo }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete image");
			}
			const result = await response.json();
			redirect("/barber/profile");
			setCurrentPhotos(result.portfolio);
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
				<form onSubmit={handleImageUpload}>
					<h2 className='form-title'>Add Photos</h2>
					<div className='inputs'>
						<input
							className='input-file'
							type='file'
							onChange={handleImageChange}
							accept='image/*' // Accept only image files
						/>
						<button className='submit-button' type='submit'>
							Add
						</button>
					</div>
					<h2 className='form-title'>Delete Photos</h2>
					<div className='delete-photos-container'>
						{currentPhotos.map((photo) => (
							<div className='delete-photo-container' key={photo}>
								<img
									className='delete-photo'
									src={photo}
									alt='barber portfolio'
								/>
								<div
									className='delete-photo-button'
									onClick={() => handleImageDelete(photo)}
								>
									Delete
								</div>
							</div>
						))}
					</div>
				</form>
			</div>
			<NavbarBarber />
		</>
	);
}
