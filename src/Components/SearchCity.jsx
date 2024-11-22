import React, { useState } from 'react';

function SearchCity({ setCity, fetchWeather }) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
    fetchWeather(input);
  };

  return (
    <div className="search-city">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter city" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchCity;
