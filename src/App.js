import { useState } from "react";
import Weather from "./Weather";
import SearchBar from "./SearchBar";
import CityLinks from "./CityLinks";
import "./App.css";

const weatherBackgrounds = {
  Clear: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=80')",
  Clouds: "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920&q=80')",
  Rain: "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1920&q=80')",
  Thunderstorm: "url('https://images.unsplash.com/photo-1603035017033-3b2643a1b5a2?auto=format&fit=crop&w=1920&q=80')",
  Snow: "url('https://images.unsplash.com/photo-1608889176126-7fbded7ca485?auto=format&fit=crop&w=1920&q=80')",
  Drizzle: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
  Mist: "url('https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=1920&q=80')",
  default: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1920&q=80')"
};


export default function App() {
  const [city, setCity] = useState("Lisbon");
  const [condition, setCondition] = useState("");

  return (
    <div
      className="container"
      style={{
        backgroundImage: weatherBackgrounds[condition] || weatherBackgrounds.default,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease-in-out"
      }}
    >
      {/* Side Panel for City Links */}
      <div className="side-panel-wrapper">
        <div className="toggle-handle">•••</div>
        <div className="city-panel">
          <CityLinks onSelect={setCity} />
        </div>
      </div>

      {/* Top Controls */}
      <div className="top-controls">
        <SearchBar onSearch={setCity} />
      </div>

      {/* Weather Info */}
      <Weather city={city} onConditionChange={setCondition} />

      <footer className="credit">
  Open‑source code by Francesca Valentini  {" "}
  <a
    href="https://github.com/novaesc"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a>{" "}
  |{" "}
  <a
    href="https://www.linkedin.com/in/francesca-valentini-dev/"
    target="_blank"
    rel="noopener noreferrer"
  >
    LinkedIn
  </a>{" "}
  · built with React
</footer>

    </div>
  );
}
