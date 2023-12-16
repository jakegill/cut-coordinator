import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Appointments.css";

export default function Appointments() {
  const [currentTab, setCurrentTab] = useState("upcoming");

  const handleChangeTab = (e) => {
    setCurrentTab(e.target.innerText.toLowerCase());
  };

  return (
    <>
      <section className="appointments-container">
        <div className="appointments-title">
          <h2>Appointments</h2>
        </div>
        <ul className="appointments-tab">
          <li
            className={currentTab === "upcoming" ? "active" : ""}
            onClick={handleChangeTab}
          >
            Upcoming
          </li>
          <li
            className={currentTab === "past" ? "active" : ""}
            onClick={handleChangeTab}
          >
            Past
          </li>
        </ul>
        <main></main>
      </section>
      <Navbar></Navbar>
    </>
  );
}
