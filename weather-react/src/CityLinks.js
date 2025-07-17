export default function CityLinks({ onSelect }) {
    const cities = ["Lisbon", "Paris", "Sydney", "San Francisco"];
  
    return (
      <nav className="city-links">
        {cities.map((c) => (
          <button
            key={c}
            className="link"
            onClick={() => onSelect(c)}
          >
            {c}
          </button>
        ))}
      </nav>
    );
  }
  