import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditPFP() {
	const email = useSelector((state) => state.auth.email);

	const [profilePicture, setProfilePicture] = useState(null);

	const redirect = useNavigate();

	const handleProfilePictureChange = (e) => {
		setProfilePicture(e.target.files[0]);
	};

	const handleProfilePictureUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", profilePicture);
		try {
			const response = await fetch(
				`http://localhost:3000/api/gcs/${email}/uploadBarberProfile`,
				{
					method: "POST",
					body: formData,
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload profile picture");
			}
			redirect("/barber/profile");
			setProfilePicture(null);
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

				<h2 className='form-title'>Edit Profile Picture</h2>
				<form onSubmit={handleProfilePictureUpload}>
					<div className='inputs'>
						<input
							required
							className='input-file'
							type='file'
							onChange={handleProfilePictureChange}
							accept='image/*' // Accept only image files
						/>
						<button className='submit-button' type='submit'>
							Change
						</button>
					</div>
				</form>
			</div>
			<NavbarBarber />
		</>
	);
}
