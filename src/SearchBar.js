import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        placeholder="Enter a city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Search
      </button>
      <button
        type="button"
        className="btn-current"
        onClick={() =>
          navigator.geolocation.getCurrentPosition((pos) =>
            onSearch(`${pos.coords.latitude},${pos.coords.longitude}`)
          )
        }
      >
        Current
      </button>
    </form>
  );
}
