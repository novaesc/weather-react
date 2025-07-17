import { useState } from "react";
import Weather from "./Weather";
import SearchBar from "./SearchBar";
import CityLinks from "./CityLinks";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Lisbon");

  return (
    <div className="container">
      <CityLinks onSelect={setCity} />
      <SearchBar onSearch={setCity} />
      <Weather city={city} />
      <footer className="credit">
        Open‑source code, by Matt Delac from She Codes
      </footer>
    </div>
  );
}
