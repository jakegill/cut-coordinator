import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Schedule.css";
import { useState } from "react";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday - 0, Monday - 1, etc.
    const currentMonth = now.toLocaleString("default", { month: "long" });
    const currentYear = now.getFullYear();
    const currentDate = now.getDate();
    let weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(currentDate - dayOfWeek + i);
      weekDates.push(date.getDate());
    }

    return { currentMonth, currentYear, weekDates };
  };

  const { currentMonth, currentYear, weekDates } = getWeekDates();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleDayClick = (dayIndex) => {
    setActiveDay(dayIndex);
  };

  return (
    <>
      <section className="schedule-container">
        <h2 className="schedule-title">Schedule</h2>
        <div className="calendar">
          <div className="month-year">{`${currentMonth.toUpperCase()} ${currentYear}`}</div>
          <div className="week-days">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className="day"
                onClick={() => handleDayClick(index)}
              >
                <div>{day}</div>
                <div className={`${index === activeDay ? "active" : ""}`}>
                  {weekDates[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NavbarBarber />
    </>
  );
}
