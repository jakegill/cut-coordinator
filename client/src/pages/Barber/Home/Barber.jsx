import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Barber.css";
import { useState } from "react";

export default function Barber() {
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  return (
    <>
      <section className="barber-home-container">
        <h2 className="barber-title">Home</h2>
        <div>
          <h4 className="barber-subtitle">TODAYS SCHEDULE</h4>
          <div className="barber-today">No appointments today</div>
        </div>
        <div>
          <h4 className="barber-subtitle">APPOINTMENT REQUESTS</h4>
          <div className="barber-requests">No pending requests</div>
        </div>
      </section>
      <NavbarBarber />
    </>
  );
}
