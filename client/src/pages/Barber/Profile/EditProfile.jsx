import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./EditProfile.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function EditProfile() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
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

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Handle address submission logic here
    console.log("Address submitted:", { address, city, state });
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    // Handle service submission logic here
    console.log("Service submitted:", service);
  };

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

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    // Handle schedule submission logic here
    console.log("Schedule submitted:", schedule);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    // Handle image upload logic here
    // For now, we just log the file object
    if (image) {
      console.log("Image file:", image);
    }
  };

  const handleImageChange = (e) => {
    // Assuming single file upload, access the first file in the array
    setImage(e.target.files[0]);
  };

  return (
    <>
      <section className="edit-profile-container">
        <Link className="return" to="/barber/profile">Return</Link>
        <form onSubmit={handleAddressSubmit}>
          <h2 className="form-title">Edit Address</h2>
          <div className="address-form">
            <input
              className="input-address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="city-state">
              <input
                className="input-city-state"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="input-city-state"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
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
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <input
                className="input-service"
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
          <button className="image-button" type="submit">Upload Image</button>
        </form>
      </section>
      <NavbarBarber />
    </>
  );
}
