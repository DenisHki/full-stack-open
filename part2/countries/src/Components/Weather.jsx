import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, [capital, api_key]);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
