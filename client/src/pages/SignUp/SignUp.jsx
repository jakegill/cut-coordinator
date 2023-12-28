import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/auth/authSlice.js";
import { setBarberProfile } from "../../../redux/profile/barberSlice.js";
import { setClientProfile } from "../../../redux/profile/clientSlice.js";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const [isLoading, setLoading] = useState(false);
	const [accountType, setAccountType] = useState("client");
	const [signUpForm, setSignUpForm] = useState({});
	const [error, setError] = useState("");
	const dispatch = useDispatch();
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
			setLoading(true);
			try {
				setError("");
				const signUpResponse = await fetch(
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

				const signUpData = await signUpResponse.json();

				if (signUpResponse.ok) {
					// Automatic sign-in
					const signInResponse = await fetch(
						`${import.meta.env.VITE_APP_API_URL}/api/auth/signin`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: signUpForm.email,
								password: signUpForm.password,
							}),
						}
					);

					const signInData = await signInResponse.json();

					if (signInResponse.ok) {
						dispatch(signIn(signInData));
						if (signInData.accountType === "barber") {
							dispatch(setBarberProfile(signInData));
							navigate("/barber");
						} else if (signInData.accountType === "client") {
							dispatch(setClientProfile(signInData));
							navigate("/client");
						}
					} else {
						setLoading(false);
						setError(signInData.message || "Automatic sign-in failed");
					}
				} else {
					setLoading(false);
					setError(signUpData.message || "Sign up failed");
				}
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError(error.message);
				setLoading(false);
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
					{isLoading ? (
						<div className='signup-spinner-container'>
							<ClipLoader
								loading={isLoading}
								size={`10vh`}
								color={`var(--primary)`}
							/>
						</div>
					) : (
						<button className='signup-form-submit' type='submit'>
							SIGN UP
						</button>
					)}
					<p className='signup-form-error'>{error}</p>
				</form>
			</section>
		</div>
	);
}
