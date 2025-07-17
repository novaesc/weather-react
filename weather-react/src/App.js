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
  Open‑source code by Francesca Valentini,{" "}
  <a
    href="https://github.com/novaesc"
    target="_blank"
    rel="noopener noreferrer"
  >
    see the code on GitHub
  </a>
  <span> · built with React · </span>
</footer>
    </div>
  );
}



