import NavbarClient from "../../../components/NavbarClient/NavbarClient";
import { useSelector } from "react-redux";
import "./Search.css";

export default function Search() {
  return (
    <>
      <section className="search-container">
        <div className="search-title">
          <h2>Search</h2>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Find barbers..."
        />
        <main></main>
      </section>
      <NavbarClient></NavbarClient>
    </>
  );
}
