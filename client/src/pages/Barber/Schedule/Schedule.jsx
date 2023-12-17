import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Schedule.css";

export default function Schedule() {
  return (
    <>
      <section className="schedule-container">
        <h2 className="schedule-title">Schedule</h2>
        <div>
          <h4 className="schedule-subtitle">TODAYS APPOINTMENTS</h4>
        </div>
        <div>
          <h4 className="schedule-subtitle">THIS WEEK</h4>
        </div>
      </section>
      <NavbarBarber />
    </>
  );
}
