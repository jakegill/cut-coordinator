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
          <div className="sign-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="logout"
              fill="hsl(0, 83%, 44%)"
              height="24"
              width="24"
            >
              <g data-name="Layer 2">
                <g data-name="log-out">
                  <rect
                    width="24"
                    height="24"
                    opacity="0"
                    transform="rotate(90 12 12)"
                  ></rect>
                  <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zM20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path>
                </g>
              </g>
            </svg>
            <Link>Sign out</Link>
          </div>
        </ul>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
