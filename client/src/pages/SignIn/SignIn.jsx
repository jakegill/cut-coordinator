import "./SignIn.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../redux/auth/authSlice.js";

export default function SignIn() {
  const [loginForm, setLoginForm] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.auth.accountType === "barber") {
      navigate("/barber");
    } else if (state.auth.accountType === "client") {
      navigate("/client");
    }
  }, []);

  const handleLoginFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
    console.log(loginForm);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(signIn(data));
        navigate(state.auth.accountType === "client" ? "/client" : "/barber");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="signin-container">
      <section className="signin-section">
        <h1 className="signin-title">Cut Coordinator</h1>
        <ul className="signin-ul">
          <Link className="signin-tab tab-active" name="login" to="/signin">
            LOG IN
          </Link>
          <Link className="signin-tab" name="signup" to="/signup">
            SIGN UP
          </Link>
        </ul>
        <form className="signin-form" onSubmit={handleLoginFormSubmit}>
          <input
            className="signin-input"
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleLoginFormChange}
          />
          <input
            className="signin-input"
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleLoginFormChange}
          />
          <button className="signin-form-submit" type="submit">
            LOG IN
          </button>
        </form>
      </section>
    </div>
  );
}
