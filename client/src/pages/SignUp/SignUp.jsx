import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [accountType, setAccountType] = useState("client");
  const [signUpForm, setSignUpForm] = useState({});

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSignUpFormChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.id]: e.target.value,
    });
    console.log(signUpForm);
  };

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
    console.log(signUpForm);
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h1 className="signup-title">Cut Coordinator</h1>
        <ul className="signup-ul">
          <Link className="signup-tab" name="signin" to="/signin">
            LOG IN
          </Link>
          <Link className="signup-tab active" name="signup" to="/signup">
            SIGN UP
          </Link>
        </ul>
        <form className="signup-form" onSubmit={handleSignUpFormSubmit}>
          <div className="signup-form-name">
            <input
              className="signup-input"
              type="text"
              id="firstName"
              placeholder="First name"
              onChange={handleSignUpFormChange}
            />
            <input
              className="signup-input"
              type="text"
              id="lastName"
              placeholder="Last name"
              onChange={handleSignUpFormChange}
            />
          </div>
          <input
            className="signup-input"
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleSignUpFormChange}
          />
          <input
            className="signup-input"
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleSignUpFormChange}
          />
          <input
            className="signup-input"
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            onChange={handleSignUpFormChange}
          />
          <div className="signup-radio-container">
            Are you a barber?
            <div>
              <input
                className="signup-radio-button"
                type="radio"
                id="no"
                name="accountType"
                value="client"
                checked={accountType === "client"}
                onChange={handleAccountTypeChange}
              />
              <label
                className={`signup-radio-label ${
                  accountType === "client"
                    ? "radio-selected"
                    : "radio-unselected"
                }`}
                htmlFor="no"
              >
                No
              </label>
            </div>
            <div>
              <input
                className="signup-radio-button"
                type="radio"
                id="yes"
                name="accountType"
                value="barber"
                checked={accountType === "barber"}
                onChange={handleAccountTypeChange}
              />
              <label
                className={`signup-radio-label ${
                  accountType === "barber"
                    ? "radio-selected"
                    : "radio-unselected"
                }`}
                htmlFor="yes"
              >
                Yes
              </label>
            </div>
          </div>
          <button className="signup-form-submit" type="submit">
            SIGN UP
          </button>
        </form>
      </section>
    </div>
  );
}
