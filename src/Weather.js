import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import AnimatedWeatherIcon from "react-animated-weather";

const apiKey = "aa09763d916df0424c840d55bfc2d2c9";

function mapToAnimatedIcon(condition) {
  const icons = {
    Thunderstorm: "RAIN",
    Drizzle: "SLEET",
    Rain: "RAIN",
    Snow: "SNOW",
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Mist: "FOG",
    Smoke: "FOG",
    Haze: "FOG",
    Dust: "FOG",
    Fog: "FOG",
    Sand: "FOG",
    Ash: "FOG",
    Squall: "WIND",
    Tornado: "WIND",
  };
  return icons[condition] || "PARTLY_CLOUDY_DAY";
}

export default function Weather({ city, onConditionChange }) {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      try {
        const current = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric`
        );
        setData(current.data);

        // Notify App of weather condition (e.g., "Clear", "Clouds", etc.)
        if (onConditionChange) {
          onConditionChange(current.data.weather[0].main);
        }

        const { lat, lon } = current.data.coord;
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const daily = forecastRes.data.list.filter((_, index) => index % 8 === 0);
        setForecast(daily);
      } catch (err) {
        console.error("Weather API error:", err);
        setData(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [city, onConditionChange]);

  if (loading || !data) {
    return (
      <div className="loader">
        <RotatingLines visible height="100" width="100" strokeColor="blue" />
      </div>
    );
  }

  if (!data) {
    return <p className="error">⚠️ City not found. Try another.</p>;
  }

  return (
    <section className="weather-card">
      <h2>{data.name}</h2>
      <p>{new Date(data.dt * 1000).toLocaleString()}</p>
      <p className="condition">{data.weather[0].main}</p>

      <div className="main-row">
        <div className="temp">
          <AnimatedWeatherIcon
            icon={mapToAnimatedIcon(data.weather[0].main)}
            color="goldenrod"
            size={48}
            animate={true}
          />
          <span>{Math.round(data.main.temp)}°C</span>
        </div>

        <div className="extra">
          <p>Clouds: {Math.round(data.clouds.all)}%</p>
          <p>Wind: {Math.round(data.wind.speed)} km/h</p>
        </div>
      </div>

      <ul className="forecast">
        {forecast.map((d) => (
          <li key={d.dt}>
            <AnimatedWeatherIcon
              icon={mapToAnimatedIcon(d.weather[0].main)}
              color="slategray"
              size={36}
              animate={true}
            />
            <span>
              {new Date(d.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </span>
            <span>{Math.round(d.main.temp)}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
