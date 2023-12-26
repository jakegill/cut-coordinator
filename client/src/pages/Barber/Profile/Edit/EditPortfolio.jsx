import NavbarBarber from "../../../../components/NavbarBarber/NavbarBarber";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function EditPortfolio() {
	const email = useSelector((state) => state.auth.email);

	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleImageUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", image);
		try {
			const response = await fetch(
				`http://localhost:3000/api/gcs/${email}/uploadImg`,
				{
					method: "POST",
					body: formData,
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload image");
			}
			const result = await response.json();
			console.log("Image uploaded:", result.imgUrl);
			setImage(null);
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
				</form>
			</div>
			<NavbarBarber />
		</>
	);
}
