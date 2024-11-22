import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCity from './SearchCity';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';

function WeatherDashboard() {
  const [city, setCity] = useState(''); // Stores the searched city
  const [weatherData, setWeatherData] = useState(null); // Holds weather data for display
  const [favorites, setFavorites] = useState([]); // Manages favorite cities list
  const [unit, setUnit] = useState('metric'); // Stores the temperature unit (metric or imperial)

  const API_KEY = 'a2e842c79c26a28b3b090118dc33439f';

  const fetchWeather = async (cityName) => {
    try {
      const currentWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData({ current: currentWeather.data, forecast: forecast.data });
      setCity(cityName); // Update city state to the searched city
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    if (city) fetchWeather(city); // Re-fetch weather data when the unit changes
  }, [unit]);

  return (
    <div className="weather-dashboard">
      <h1>Weather Forecast</h1>
      <button  onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <SearchCity setCity={setCity} fetchWeather={fetchWeather} />
      {weatherData && <WeatherDisplay weatherData={weatherData} unit={unit} />}
      <Favorites
        favorites={favorites}
        fetchWeather={fetchWeather}
        fetchFavorites={fetchFavorites}
        city={city} // Pass the current city to Favorites
      />
    </div>
  );
}

export default WeatherDashboard;
