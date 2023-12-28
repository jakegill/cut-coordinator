import "./SignIn.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../redux/auth/authSlice.js";
import { setBarberProfile } from "../../../redux/profile/barberSlice.js";
import { setClientProfile } from "../../../redux/profile/clientSlice.js";
import { ClipLoader } from "react-spinners";

export default function SignIn() {
	const [isLoading, setLoading] = useState(false);
	const [loginForm, setLoginForm] = useState({});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.accountType === "barber") {
			navigate("/barber");
		} else if (auth.accountType === "client") {
			navigate("/client");
		}
	}, []);

	const handleLoginFormChange = (e) => {
		setLoginForm({
			...loginForm,
			[e.target.id]: e.target.value,
		});
	};

	const handleLoginFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_APP_API_URL}/api/auth/signin`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginForm),
				}
			);
			const usersAccountData = await response.json();
			if (response.ok) {
				dispatch(signIn(usersAccountData));
				if (usersAccountData.accountType === "barber") {
					dispatch(setBarberProfile(usersAccountData));
					navigate("/barber");
				} else if (usersAccountData.accountType === "client") {
					dispatch(setClientProfile(usersAccountData));
					navigate("/client");
				}
			} else {
				setLoading(false);
				setError(usersAccountData.message || "Invalid credentials");
			}
		} catch (error) {
			console.error("Login error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='signin-container'>
			<section className='signin-section'>
				<h1 className='signin-title'>Cut Coordinator</h1>
				<ul className='signin-ul'>
					<Link className='signin-tab tab-active' name='login' to='/signin'>
						SIGN IN
					</Link>
					<Link className='signin-tab' name='signup' to='/signup'>
						SIGN UP
					</Link>
				</ul>
				<form className='signin-form' onSubmit={handleLoginFormSubmit}>
					<input
						className='signin-input'
						type='email'
						id='email'
						placeholder='Email'
						onChange={handleLoginFormChange}
					/>
					<input
						className='signin-input'
						type='password'
						id='password'
						placeholder='Password'
						onChange={handleLoginFormChange}
					/>
					{isLoading ? (
						<div className='signin-spinner-container'>
							<ClipLoader
								loading={isLoading}
								size={`10vh`}
								color={`var(--primary)`}
							/>
						</div>
					) : (
						<button className='signin-form-submit' type='submit'>
							SIGN IN
						</button>
					)}
				</form>
				<div className='signin-error'>{error}</div>
			</section>
		</div>
	);
}
