import React from 'react';

function WeatherDisplay({ weatherData, unit }) {
  return (
    <div className="weather-display">
      <h2>Current Weather for {weatherData.current.name}</h2>
      <p>
        Temperature: {weatherData.current.main.temp}°{unit === 'metric' ? 'C' : 'F'}
      </p>
      <h3>5-Day Forecast</h3>
      {/* Display the forecast data */}
      {weatherData.forecast.list.slice(0, 5).map((item, index) => (
        <div key={index}>
          <p>Date: {item.dt_txt}</p>
          <p>
            Temperature: {item.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
