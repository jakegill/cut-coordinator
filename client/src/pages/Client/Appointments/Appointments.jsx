import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Appointments.css";

export default function Appointments() {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const currentClient = useSelector((state) => state.auth);

  const handleChangeTab = (e) => {
    setCurrentTab(e.target.innerText.toLowerCase());
  };

  const getAppoinments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/client/${currentClient.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      console.log(data);
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
        <main></main>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
