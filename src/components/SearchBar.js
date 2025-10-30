import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  // Manual search by city name
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return alert('Please enter a city name.');
    dispatch(fetchWeather(term));
    setTerm('');
  };

  // Geolocation search (fetch weather by current location)
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Your location:', latitude, longitude);

        // Optional: reverse-geocode to city name (free API)
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await res.json();
        const city = data.city || data.locality || data.principalSubdivision;

        if (city) {
          dispatch(fetchWeather(city));
          alert(`Showing weather for your location: ${city}`);
        } else {
          alert('Could not determine your city from location.');
        }
      },
      (error) => {
        alert('Error getting your location: ' + error.message);
      }
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a city"
          style={{ padding: '8px', width: '250px', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{ marginLeft: '10px', padding: '8px 12px', fontSize: '16px' }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
