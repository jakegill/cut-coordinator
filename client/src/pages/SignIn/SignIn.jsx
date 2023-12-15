import "./SignIn.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [loginForm, setLoginForm] = useState({});

  const handleLoginFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
    console.log(loginForm);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginForm);
  };

  return (
    <div className="signin-container">
      <section className="signin-section">
        <h1 className="signin-title">Cut Coordinator</h1>
        <ul className="signin-ul">
          <Link className="signin-tab active" name="login" to="/signin">
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
