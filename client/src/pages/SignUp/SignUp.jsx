import "./SignUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
	const [accountType, setAccountType] = useState("client");
	const [signUpForm, setSignUpForm] = useState({});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleAccountTypeChange = (e) => {
		setAccountType(e.target.value);
	};

	const handleSignUpFormChange = (e) => {
		setSignUpForm({
			...signUpForm,
			[e.target.id]: e.target.value,
		});
	};

	const handleSignUpFormSubmit = async (e) => {
		e.preventDefault();
		if (!signUpForm.firstName || !signUpForm.lastName || !signUpForm.email) {
			setError("Required fields are empty.");
		} else if (signUpForm.password !== signUpForm.confirmPassword) {
			setError("Passwords do not match.");
		} else {
			try {
				setError("");
				const res = await fetch(
					`${import.meta.env.VITE_APP_API_URL}/api/auth/signup`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							...signUpForm,
							accountType,
						}),
					}
				);
				const data = await res.json();
				navigate("/signin");
			} catch (error) {
				console.error(error);
				setError(error.message);
			}
		}
	};

	return (
		<div className='signup-container'>
			<section className='signup-section'>
				<h1 className='signup-title'>Cut Coordinator</h1>
				<ul className='signup-ul'>
					<Link className='signup-tab' name='signin' to='/signin'>
						SIGN IN
					</Link>
					<Link className='signup-tab tab-active' name='signup' to='/signup'>
						SIGN UP
					</Link>
				</ul>
				<form className='signup-form' onSubmit={handleSignUpFormSubmit}>
					<div className='signup-form-name'>
						<input
							className='signup-input'
							type='text'
							id='firstName'
							placeholder='First name'
							onChange={handleSignUpFormChange}
						/>
						<input
							className='signup-input'
							type='text'
							id='lastName'
							placeholder='Last name'
							onChange={handleSignUpFormChange}
						/>
					</div>
					<input
						className='signup-input'
						type='email'
						id='email'
						placeholder='Email'
						onChange={handleSignUpFormChange}
					/>
					<input
						className='signup-input'
						type='password'
						id='password'
						placeholder='Password'
						onChange={handleSignUpFormChange}
					/>
					<input
						className='signup-input'
						type='password'
						id='confirmPassword'
						placeholder='Confirm password'
						onChange={handleSignUpFormChange}
					/>
					<div className='signup-radio-container'>
						Are you a barber?
						<div>
							<input
								className='signup-radio-button'
								type='radio'
								id='no'
								name='accountType'
								value='client'
								checked={accountType === "client"}
								onChange={handleAccountTypeChange}
							/>
							<label
								className={`signup-radio-label ${
									accountType === "client"
										? "radio-selected"
										: "radio-unselected"
								}`}
								htmlFor='no'
							>
								No
							</label>
						</div>
						<div>
							<input
								className='signup-radio-button'
								type='radio'
								id='yes'
								name='accountType'
								value='barber'
								checked={accountType === "barber"}
								onChange={handleAccountTypeChange}
							/>
							<label
								className={`signup-radio-label ${
									accountType === "barber"
										? "radio-selected"
										: "radio-unselected"
								}`}
								htmlFor='yes'
							>
								Yes
							</label>
						</div>
					</div>
					<button className='signup-form-submit' type='submit'>
						SIGN UP
					</button>
					<p className='signup-form-error'>{error}</p>
				</form>
			</section>
		</div>
	);
}
