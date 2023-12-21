import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import "./Client.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ClientHome() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.clientProfile);

  const fetchClientData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/editClient/${auth.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch client details");
      }
      const clientData = await response.json();
      const dispatchData = {
        profilePicture: clientData.profilePicture,
        barbers: clientData.barbers || [],
      };
      console.log(dispatchData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <>
      <section className="client-container">
        <h3 className="client-name">{`${auth.firstName} ${auth.lastName}`}</h3>
        <img className="client-img" src={profile.profilePicture} alt="avatar" />

        <main>
          <header className="client-main-header">
            <h3 className="client-subtitle">MY BARBERS</h3>
            <Link to="/client/search" className="client-link">
              FIND BARBERS
            </Link>
          </header>
          <div className="client-barbers">
            {profile.barbers.length === 0 ? (
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
