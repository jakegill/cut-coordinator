import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Appointments.css";

export default function Appointments() {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const currentClient = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });

  useEffect(() => {
    getAppointments();
  }, []);

  const handleChangeTab = (e) => {
    setCurrentTab(e.target.innerText.toLowerCase());
  };

  const getAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/client/${currentClient.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const pastAppointments = [];
      const upcomingAppointments = [];

      for (const appointment of data.appointments) {
        const barberResponse = await fetch(`http://localhost:3000/api/barber/${appointment.barberEmail}`);
        const barber = await barberResponse.json();

        const [dayOfWeek, monthDay] = appointment.date.split(', ');
        const [month, day] = monthDay.split(' ');
        const monthNumber = new Date(`${month} 1`).getMonth();
        const appointmentDate = new Date(currentYear, monthNumber, day);

        const enhancedAppointment = {
          ...appointment,
          barberFirstName: barber.firstName,
          barberLastName: barber.lastName,
          barberProfilePicture: barber.profilePicture,
          barberLocation: barber.location
        };

        if (appointmentDate < currentDate) {
          pastAppointments.push(enhancedAppointment);
        } else {
          upcomingAppointments.push(enhancedAppointment);
        }
      }

      setAppointments({ past: pastAppointments, upcoming: upcomingAppointments });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="appointments-container">
        <div className="appointments-title">
          <h2>Appointments</h2>
        </div>
        <ul className="appointments-tab">
          <li
            className={currentTab === "upcoming" ? "tab-active" : ""}
            onClick={handleChangeTab}
          >
            Upcoming
          </li>
          <li
            className={currentTab === "past" ? "tab-active" : ""}
            onClick={handleChangeTab}
          >
            Past
          </li>
        </ul>
        <main>
          {appointments[currentTab] && appointments[currentTab].length > 0 ? (
            <div className="appointment-card-container">
              {appointments[currentTab].map((appointment, index) => (
                <div className="appointment-card" key={index}>
                  <div className="appointment-pfp-name-container">
                    <img className="appointment-profile-picture" src={appointment.barberProfilePicture} alt="barber" />
                    <h3 className="appointment-barber">{`${appointment.barberFirstName} ${appointment.barberLastName}`}</h3>
                  </div>
                  <address className="appointment-address">{`${appointment.barberLocation.address}, ${appointment.barberLocation.city} ${appointment.barberLocation.state}`}</address>
                  <time className="appointment-time">{`${appointment.time} ${appointment.date}`}</time>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-appointment">
              {`No ${currentTab} appointments.`}
            </p>
          )}
        </main>
      </section>
      <NavbarClient />
    </>
  );
}