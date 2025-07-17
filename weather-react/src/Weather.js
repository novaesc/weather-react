import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const apiKey = "88724523008dc9e1be18f6eb6a959b67";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      try {
        // if the user provided lat,lon use those; else treat as city name
        const isCoord = city.includes(",");
        const currentUrl = isCoord
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${city.split(",")[0]}&lon=${city.split(",")[1]}&appid=${apiKey}&units=metric`
          : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const current = await axios.get(currentUrl);
        setData(current.data);

        const { lat, lon } = current.data.coord;
        const oneCall = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
        );
        setForecast(oneCall.data.daily.slice(1, 6)); 
      } catch (err) {
        alert("City not found");
      } finally {
        setLoading(false);
      }
    }
    getWeather();
  }, [city]);

  if (loading || !data) {
    return (
      <div className="loader">
          <RotatingLines
      visible
      height="100"
      width="100"
      strokeColor="blue"
      strokeWidth="5"
      animationDuration="0.75"
    />
      </div>
    );
  }

  const dayOptions = { weekday: "short" };
  const dateOptions = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  return (
    <section className="weather-card">
      <h2>{data.name}</h2>
      <p>{new Date(data.dt * 1000).toLocaleString(undefined, dateOptions)}</p>
      <p className="condition">{data.weather[0].main}</p>

      <div className="main-row">
        <div className="temp">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
          <span>{Math.round(data.main.temp)}°C</span>
        </div>

        <div className="extra">
          <p>Precipitation: {Math.round(data.clouds)}%</p>
          <p>Wind: {Math.round(data.wind.speed)} km/h</p>
        </div>

        <button className="play-btn" aria-label="Play forecast" />
      </div>

      <ul className="forecast">
        {forecast.map((d) => (
          <li key={d.dt}>
            <div className="icon">
              <img
                src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
                alt={d.weather[0].description}
              />
            </div>
            <span>
              {new Date(d.dt * 1000).toLocaleDateString(undefined, dayOptions)}
            </span>
            <span>{Math.round(d.temp.day)}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
