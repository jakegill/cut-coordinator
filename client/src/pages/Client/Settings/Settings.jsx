import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import "./Settings.css";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <>
      <section className="settings-container">
        <div className="settings-title">
          <h2>Settings</h2>
        </div>
        <ul className="settings-list">
            <Link className="sign-out">Sign out</Link>
        </ul>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
