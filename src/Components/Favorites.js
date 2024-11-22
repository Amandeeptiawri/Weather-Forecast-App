import React from 'react';
import axios from 'axios';
import { FcLike } from "react-icons/fc";

function Favorites({ favorites, fetchWeather, fetchFavorites, city }) { // Accept `city` prop

  const addFavorite = async () => {
    if (city) { // Check if `city` has a value before adding
      try {
        await axios.post('http://localhost:5000/favorites', { city });
        fetchFavorites(); // Refresh the favorites list after adding
      } catch (error) {
        console.error("Error adding favorite", error);
      }
    } else {
      console.log("No city available to add to favorites.");
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      fetchFavorites(); // Refresh the list after removal
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  return (
    <div className="favorites">
      <h3><FcLike /></h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.city}
            <button onClick={() => fetchWeather(fav.city)}>View Weather</button>
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addFavorite}>Add {city} to Favorites</button> {/* Add button for the searched city */}
    </div>
  );
}

export default Favorites;
