import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import SearchCity from './SearchCity'; 
import WeatherDisplay from './WeatherDisplay'; 
import Favorites from './Favorites'; 

function WeatherDashboard() {
  const [city, setCity] = useState(''); // Tracks the currently searched city
  const [weatherData, setWeatherData] = useState(null); // Holds weather data for display
  const [favorites, setFavorites] = useState([]); // Stores the list of favorite cities
  const [unit, setUnit] = useState('metric'); // Stores temperature units (metric/imperial)

  const API_KEY = 'a2e842c79c26a28b3b090118dc33439f'; 

 
  const fetchWeather = async (cityName) => {
    try {
      const currentWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const forecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );

      // Extract daily forecast data for noon time
      const dailyForecast = forecast.data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
      );

      setWeatherData({
        current: currentWeather.data, 
        forecast: dailyForecast,
      });
      setCity(cityName); 

      // Save the last searched city to local storage
      localStorage.setItem('lastCity', cityName);
    } catch (error) {
      console.error('Error fetching weather data', error); 
    }
  };

  // Fetches the favorite cities from the server
  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites'); // Mock API for favorites
      setFavorites(response.data); 
    } catch (error) {
      console.error('Error fetching favorites', error); 
    }
  };

 
  useEffect(() => {
    fetchFavorites();

    // Load last searched city from local storage and fetch its weather
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity); 
      fetchWeather(lastCity); 
    }
  }, []);

  
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

 
  useEffect(() => {
    if (city) fetchWeather(city); 
  }, [unit]);

  return (
    <div className="weather-dashboard">
      <h1>Weather Forecast</h1>

      {/* Button to toggle temperature units */}
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      {/* SearchCity component for city input */}
      <SearchCity setCity={setCity} fetchWeather={fetchWeather} />

     
      {weatherData && (
        <WeatherDisplay weatherData={weatherData} unit={unit} />
      )}

      {/* Favorites component for displaying and managing favorites */}
      <Favorites
        favorites={favorites}
        fetchWeather={fetchWeather}
        fetchFavorites={fetchFavorites}
        city={city} 
      />
    </div>
  );
}

export default WeatherDashboard; 
