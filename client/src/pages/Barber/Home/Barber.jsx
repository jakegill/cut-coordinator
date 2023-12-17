import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Barber.css";

export default function Barber() {
  return (
    <>
      <section className="barber-container">
        <h2 className="barber-title">Home</h2>
        <div>
          <h4 className="barber-subtitle">APPOINTMENT REQUESTS</h4>
        </div>
      </section>
      <NavbarBarber />
    </>
  );
}
