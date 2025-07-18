export default function CityLinks({ onSelect }) {
  const cities = ["Lisbon", "Paris", "Sydney", "San Francisco"];

  return (
    <nav className="city-links">
      {cities.map((city) => (
        <button key={city} onClick={() => onSelect(city)} className="link">
          {city}
        </button>
      ))}
    </nav>
  );
}
