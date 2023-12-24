import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import "./Client.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setClientProfile } from "../../../../redux/profile/clientSlice";

export default function ClientHome() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.clientProfile);
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch();

  const handlePfpClick = () => { //open modal
    const dialog = document.querySelector("dialog");
    dialog.showModal();
  };
  
  const handleDialogClose = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
  }  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); 
    }
  };

  const handlePfpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", profilePicture);
    console.log("formData:", formData);
    try {
      const response = await fetch(
        `http://localhost:3000/api/gcs/${auth.email}/uploadClientProfileImg`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      console.log("Profile picture uploaded:", result.imgUrl);
      setProfilePicture(null);
    } catch (error) {
      console.error("Error:", error);
      
    }

  };

  const fetchClientData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/client/${auth.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch client details");
      }
      const clientData = await response.json();
      const dispatchData = {
        profilePicture: clientData.profilePicture,
        barbers: clientData.barbers || [],
      };
      dispatch(setClientProfile(dispatchData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <>
      <section className="client-container">
        <dialog className="dialog-container">
          <div className="dialog-close"onClick={handleDialogClose}>CANCEL</div>
          <form onSubmit={handlePfpSubmit} className="dialog-form">
            <label className="dialog-label">
              Edit Profile Picture:
            </label>
            <input onChange={handleFileChange} className="dialog-input" type="file" accept="image/*" />
              <button className="dialog-submit" type="submit" >Change</button>
          </form >
        </dialog>
        <h3 className="client-name">{`${auth.firstName} ${auth.lastName}`}</h3>
        <img onClick={handlePfpClick} className="client-img" src={profile.profilePicture} alt="avatar" />

        <main>
          <header className="client-main-header">
            <h3 className="client-subtitle">MY BARBERS</h3>
            <Link to="/client/search" className="client-link">
              FIND BARBERS
            </Link>
          </header>
          <div className="client-barbers">
            {profile.barbers.length === 0 ? (
              <>
                <div className="no-barbers-container">
                  <p className="no-barbers">No saved barbers!</p>
                  <Link className="no-barbers-button" to="/client/search">
                    Find Barbers
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </section>
      
      <NavbarClient />
    </>
  );
}
