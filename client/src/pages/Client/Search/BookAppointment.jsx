import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./BookAppointment.css";
import { set } from "mongoose";

export default function BookAppointment() {
  const currentClient = useSelector((state) => state.auth);
  const location = useLocation();
  const [barber, setBarber] = useState(location.state.barber);
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleDayClick = (dayIndex, dayOfWeek, dayNumber, month) => {
    setActiveDay(dayIndex);
    setSelectedDate(`${dayOfWeek}, ${month} ${dayNumber}`);
  };

  const handleAppointmentSubmit = async () => {
    if (selectedService && selectedTime) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/appointments/createAppointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              barberEmail: barber.email,
              clientEmail: currentClient.email,
              clientFirstName: currentClient.firstName,
              clientLastName: currentClient.lastName,
              service: selectedService,
              time: selectedTime,
              day: activeDay,
            }),
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

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
  const convertDay = (day) => {
    // used for accesing json
    if (day === "SUN") {
      return "Sunday";
    } else if (day === "MON") {
      return "Monday";
    } else if (day === "TUE") {
      return "Tuesday";
    } else if (day === "WED") {
      return "Wednesday";
    } else if (day === "THU") {
      return "Thursday";
    } else if (day === "FRI") {
      return "Friday";
    } else if (day === "SAT") {
      return "Saturday";
    }
  };

  function generateTimeSlots(startTime, endTime) {
    const start = parseInt(startTime.split(":")[0], 10);
    const end = parseInt(endTime.split(":")[0], 10);
    const timeSlots = [];

    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += 30) {
        let period = "AM";
        let militaryHour = hour;
        if (hour > 12) {
          militaryHour = hour - 12;
          period = "PM";
        } else if (hour === 12) {
          period = "PM";
        } else if (hour === 0) {
          militaryHour = 12;
        }
        const time =
          ("0" + militaryHour).slice(-2) +
          ":" +
          ("0" + min).slice(-2) +
          " " +
          period;
        timeSlots.push(time);
      }
    }
    return timeSlots;
  }

  return (
    <>
      <header className="book-header">
        <img className="book-pfp" src={barber.profilePicture} alt="" />
        <div>
          <h2 className="book-name">{`${barber.firstName} ${barber.lastName}`}</h2>
          <address className="book-location">{`${barber.location.address}, ${barber.location.city} ${barber.location.state}`}</address>
        </div>
      </header>
      <main className="book-main-container">
        <div className="book-services-container">
          <h3 className="book-subtitle">SELECT SERVICE</h3>
          <form action="">
            {barber.services.map((service, index) => (
              <div className="book-service" key={index}>
                <input
                  type="radio"
                  id={`service-${index}`}
                  name="service"
                  value={service.service}
                  onChange={() => setSelectedService(service.service)}
                />
                <label className="book-service" htmlFor={`service-${index}`}>
                  <p className="book-service-price">{service.price}</p>
                  <h4 className="book-service-name">{service.service}</h4>
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="book-calendar-container">
          <h3 className="book-subtitle">SELECT DATE</h3>
          <div className="calendar">
            <div className="month-year">{`${currentMonth.toUpperCase()} ${currentYear}`}</div>
            <div className="week-days">
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className="day"
                  onClick={() =>
                    handleDayClick(index, day, weekDates[index], currentMonth)
                  }
                >
                  <div>{day}</div>
                  <div className={`${index === activeDay ? "active" : ""}`}>
                    {weekDates[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="book-time-container">
          {daysOfWeek.map((day, index) => {
            if (index === activeDay) {
              if (barber.schedule.days[convertDay(day)]) {
                return (
                  <div key={day}>
                    <h4 className="book-subtitle">SELECT TIME</h4>
                    <select
                      className="book-select-time"
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {generateTimeSlots(
                        barber.schedule.startTime,
                        barber.schedule.endTime
                      ).map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                return <p key={day}>No available appointments</p>;
              }
            }
            return null;
          })}
        </div>
        <button className="book-button" onClick={handleAppointmentSubmit}>
          Schedule Appointment
        </button>
      </main>
    </>
  );
}
