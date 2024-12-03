import React from 'react';

function WeatherDisplay({ weatherData, unit }) {
  const { current, forecast } = weatherData;

  return (
    <div className="weather-display">
      <h2>Current Weather for {current.name}</h2>
      <p>Temperature: {current.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>

      <h2>5-Day Forecast</h2>
      <ul>
        {forecast.map((day) => (
          <li key={day.dt}>
            <p>Date: {new Date(day.dt_txt).toDateString()}</p>
            <p>Temperature: {day.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Weather: {day.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherDisplay;

