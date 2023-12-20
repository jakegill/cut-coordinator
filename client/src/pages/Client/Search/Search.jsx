import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Search.css";

export default function Search() {
  const [barbers, setBarbers] = useState([]);

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
        <div className="search-title">
          <h2>Search</h2>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Find barbers..."
        />
        <main className="barber-search-container">
          {barbers.map((barber) => (
            <div className="barber-card" key={barber._id}>
              <h3>{`${barber.firstName} ${barber.lastName}`}</h3>
              <p>
                {barber.location
                  ? `${barber.location.city}, ${barber.location.state}`
                  : "Location not available"}
              </p>
            </div>
          ))}
        </main>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
