import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import "./Client.css";
import { Link } from "react-router-dom";

export default function ClientHome() {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <section className="client-container">
        <div className="client-title">
          <h2>Home</h2>
        </div>
        <img className="client-img" src={user.profilePicture} alt="avatar" />
        <h3 className="client-name">{`${user.firstName} ${user.lastName}`}</h3>
        <main>
          <header className="client-main-header">
            <h3 className="client-subtitle">MY BARBERS</h3>
            <Link to="/client/search" className="client-link">
              FIND BARBERS
            </Link>
          </header>
          <div className="client-barbers">
            {user.barbers.length === 0 ? (
              <>
                <div className="no-barbers-container">
                  <p className="no-barbers">No saved barbers!</p>
                  <Link className="no-barbers-button" to="/client/search">
                    Find A Barber
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </section>
      <NavbarClient />
    </>
  );
}
