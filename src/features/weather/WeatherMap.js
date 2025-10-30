import React, { useCallback, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  marginTop: '20px',
};

const WeatherMap = ({ lat, lon }) => {
  const dispatch = useDispatch();
  const [nearbyCities, setNearbyCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Fetch nearby city weather data
  useEffect(() => {
    if (!lat || !lon) return;

    const fetchNearbyCities = async () => {
      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

        console.log('Fetching nearby cities from OpenWeather...');
        console.log(`lat=${lat}, lon=${lon}`);
        console.log('API key present?', !!API_KEY);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=10&units=imperial&appid=${API_KEY}`
        );

        const data = await res.json();
        console.log('Fetching nearby cities from OpenWeather...');
        console.log('lat=', lat, 'lon=', lon);
        console.log('API key present?', !!apiKey);
        console.log('Nearby city data:', data);


        setNearbyCities(data.list || []);
      } catch (err) {
        console.error('Failed to fetch nearby cities:', err);
      }
    };

    fetchNearbyCities();
  }, [lat, lon]);

  // When a city is clicked, update Redux weather data & highlight on map
  const handleCityClick = (city) => {
    setSelectedCity(city);
    dispatch(fetchWeather(city.name)); // switch app's weather to that city
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat, lng: lon }}
      zoom={8}
    >
      {/* Map nearby cities */}
      {nearbyCities.map((city) => {
        const iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

        return (
          <Marker
            key={city.id}
            position={{ lat: city.coord.lat, lng: city.coord.lon }}
            onClick={() => handleCityClick(city)}
            icon={{
              url: iconUrl,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            label={{
              text: `${Math.round(city.main.temp)}°`,
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          />
        );
      })}

      {/* InfoWindow for selected city */}
      {selectedCity && (
        <InfoWindow
          position={{
            lat: selectedCity.coord.lat,
            lng: selectedCity.coord.lon,
          }}
          onCloseClick={() => setSelectedCity(null)}
        >
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0 }}>{selectedCity.name}</h4>
            <img
              src={`https://openweathermap.org/img/wn/${selectedCity.weather[0].icon}@2x.png`}
              alt={selectedCity.weather[0].description}
            />
            <p style={{ margin: '5px 0' }}>
              <strong>{Math.round(selectedCity.main.temp)}°F</strong>
            </p>
            <p style={{ margin: 0, textTransform: 'capitalize' }}>
              {selectedCity.weather[0].description}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default WeatherMap;
