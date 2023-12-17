import NavbarBarber from "../../../components/NavbarBarber/NavbarBarber";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <section className="profile-container">
        <header className="profile-header">
          <img className="profile-img" src={user.profilePicture} alt="avatar" />
          <h3 className="profile-name">{`${user.firstName} ${user.lastName}`}</h3>
        </header>
        <div>
          <h4 className="profile-subtitle">ADDRESS</h4>
          {user.address ? <p>{user.address}</p> : null}
        </div>
        <div>
          <h4 className="profile-subtitle">SCHEDULE</h4>
          {user.schedule ? <p>{user.schedule}</p> : null}
        </div>
        <div>
          <h4 className="profile-subtitle">SERVICES</h4>
          {user.services ? <p>{user.services}</p> : null}
        </div>
        <div>
          <h4 className="profile-subtitle">PORTFOLIO</h4>
          {user.portfolio ? <p>{user.portfolio}</p> : null}
        </div>
        <Link to="edit" className="profile-edit-button">
          Edit Profile
        </Link>
      </section>
      <NavbarBarber />
    </>
  );
}
