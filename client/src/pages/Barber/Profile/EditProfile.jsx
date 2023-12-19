import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./EditProfile.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const email = useSelector((state) => state.auth.email);
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
  });
  const [service, setService] = useState({
    service: "",
    price: "",
  });
  const [schedule, setSchedule] = useState({
    days: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    },
    startTime: "",
    endTime: "",
  });
  const [image, setImage] = useState(null);

  const updateBarberDetails = async (details) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/editBarber/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update barber details");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // -------Submit forms ------
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    updateBarberDetails({ location: { ...location }, email });
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    updateBarberDetails({ service: { ...service }, email });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    updateBarberDetails({ schedule: { ...schedule }, email });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    // Handle image upload logic here
  };

  // -------Change forms ------
  const handleScheduleChange = (day) => {
    setSchedule({
      ...schedule,
      days: {
        ...schedule.days,
        [day]: !schedule.days[day],
      },
    });
  };

  const handleTimeChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    // Assuming single file upload, access the first file in the array
    setImage(e.target.files[0]);
  };

  return (
    <>
      <section className="edit-profile-container">
        <Link className="return" to="/barber/profile">
          Return
        </Link>
        <form onSubmit={handleAddressSubmit}>
          <h2 className="form-title">Edit Address</h2>
          <div className="address-form">
            <input
              className="input-address"
              type="text"
              placeholder="Address"
              value={location.address}
              onChange={(e) =>
                setLocation({ ...location, address: e.target.value })
              }
            />
            <div className="city-state">
              <input
                className="input-city-state"
                type="text"
                placeholder="City"
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
              <input
                className="input-city-state"
                type="text"
                placeholder="State"
                value={location.state}
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>

        <form className="service-form" onSubmit={handleServiceSubmit}>
          <h2 className="form-title">Add Services</h2>
          <div className="service-grid">
            <div className="service-flex">
              <input
                className="input-service"
                type="text"
                placeholder="Service"
                value={service.service}
                onChange={(e) =>
                  setService({ ...service, service: e.target.value })
                }
              />
              <input
                className="input-service"
                type="text"
                placeholder="Price"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: e.target.value })
                }
              />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>

        <form className="schedule-form" onSubmit={handleScheduleSubmit}>
          <h2 className="form-title">Edit Schedule</h2>
          <div className="schedule-container">
            <div className="days-container">
              {Object.keys(schedule.days).map((day) => (
                <div className="input-day" key={day}>
                  <input
                    type="checkbox"
                    id={day}
                    checked={schedule.days[day]}
                    onChange={() => handleScheduleChange(day)}
                  />
                  <label htmlFor={day}>{day}</label>
                </div>
              ))}
            </div>
            <div className="time-container">
              <label className="time-label" htmlFor="startTime">
                From
              </label>
              <input
                className="input-time"
                type="time"
                name="startTime"
                value={schedule.startTime}
                onChange={handleTimeChange}
              />
              <label className="time-label" htmlFor="endTime">
                To
              </label>
              <input
                className="input-time"
                type="time"
                name="endTime"
                value={schedule.endTime}
                onChange={handleTimeChange}
              />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>

        <form className="photo-form" onSubmit={handleImageUpload}>
          <h2 className="form-title">Edit Photos</h2>
          <input
            className="input-file"
            type="file"
            onChange={handleImageChange}
            accept="image/*" // Accept only image files
          />
          <button className="image-button" type="submit">
            Upload Image
          </button>
        </form>
      </section>
      <NavbarBarber />
    </>
  );
}
