import "./SignIn.css";
import { useState } from "react";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("login");
  const [accountType, setAccountType] = useState("client");
  const [loginForm, setLoginForm] = useState({});
  const [signUpForm, setSignUpForm] = useState({});

  const handleTabChange = (e) => {
    setActiveTab(e.target.name);
    setLoginForm({});
    setSignUpForm({});
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

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
    <div className="home-container">
      <section className="home-section">
        <h1 className="home-title">Cut Coordinator</h1>
        <ul className="home-ul">
          <li className="home-li">
            <button
              className={`home-tab ${activeTab === "login" ? "active" : ""}`}
              name="login"
              onClick={handleTabChange}
            >
              LOG IN
            </button>
          </li>
          <li className="home-li">
            <button
              className={`home-tab ${activeTab === "sign-up" ? "active" : ""}`}
              name="sign-up"
              onClick={handleTabChange}
            >
              SIGN UP
            </button>
          </li>
        </ul>
        {activeTab === "login" ? (
          <form className="home-form">
            <input
              className="home-input"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleLoginFormChange}
            />
            <input
              className="home-input"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleLoginFormChange}
            />
            <button
              className="home-form-submit"
              type="submit"
              onSubmit={handleLoginFormSubmit}
            >
              LOG IN
            </button>
          </form>
        ) : (
          <form className="home-form">
            <div className="home-form-name">
              <input
                className="home-input"
                type="text"
                id="firstName"
                placeholder="First name"
                onChange={handleSignUpFormChange}
              />
              <input
                className="home-input"
                type="text"
                id="lastName"
                placeholder="Last name"
                onChange={handleSignUpFormChange}
              />
            </div>
            <input
              className="home-input"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleSignUpFormChange}
            />
            <input
              className="home-input"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleSignUpFormChange}
            />
            <input
              className="home-input"
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              onChange={handleSignUpFormChange}
            />
            <label className="home-radio-container">
              Are you a barber?
              <div>
                <input
                  className="home-radio-button"
                  type="radio"
                  id="no"
                  name="accountType"
                  value="client"
                  onChange={handleAccountTypeChange}
                />
                <label
                  className={`home-radio-label ${
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
                  className="home-radio-button"
                  type="radio"
                  id="yes"
                  name="accountType"
                  value="barber"
                  onChange={handleAccountTypeChange}
                />
                <label
                  className={`home-radio-label ${
                    accountType === "barber"
                      ? "radio-selected"
                      : "radio-unselected"
                  }`}
                  htmlFor="yes"
                >
                  Yes
                </label>
              </div>
            </label>
            <button
              className="home-form-submit"
              type="submit"
              onSubmit={handleSignUpFormSubmit}
            >
              SIGN UP
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
