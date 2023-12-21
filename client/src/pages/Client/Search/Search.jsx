import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  const handleBookAppointmentClick = (barber) => {
    navigate("/client/search/book", { state: { barber } });
  };

  const fetchBarbers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/barbers/getAllBarbers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch barbers");
      }
      const data = await response.json();
      setBarbers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <>
      <section className="search-container">
        <div className="search-title"></div>
        <input
          type="text"
          className="search-bar"
          placeholder="Find barbers..."
        />
        <main className="barber-search-container">
          {barbers.map((barber) => (
            <div className="barber-card" key={barber._id}>
              <div className="barber-card-top-container">
                <img
                  className="barber-card-pfp"
                  src={`${barber.profilePicture}`}
                  alt=""
                />
                <div>
                  <h3 className="barber-card-name">{`${barber.firstName} ${barber.lastName}`}</h3>
                  <p className="barber-card-location">
                    {barber.location
                      ? `${barber.location.city}, ${barber.location.state}`
                      : "Location unavailable"}
                  </p>
                </div>
              </div>
              <div className="barber-card-portfolio">
                {barber.portfolio && barber.portfolio.length > 0 ? (
                  barber.portfolio.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Portfolio image ${index + 1}`}
                      className="barber-portfolio-image"
                    />
                  ))
                ) : (
                  <p>No portfolio images available.</p>
                )}
              </div>
              {console.log(barber)}
              <button
                onClick={() => handleBookAppointmentClick(barber)}
                className="barber-card-button"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          ))}
        </main>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
