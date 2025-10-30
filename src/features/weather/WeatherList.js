import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../../components/Chart';

const WeatherList = () => {
  const { data: weather, status, error } = useSelector((state) => state.weather);

  // function to handle setting default city
  const handleSetDefault = (cityName) => {
    localStorage.setItem('defaultCity', cityName);
    alert(`${cityName} has been set as your default city.`);
  };

  // Handle loading and error states
  if (status === 'loading') {
    return <p style={{ textAlign: 'center' }}>Loading weather data...</p>;
  }

  if (status === 'failed') {
    return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  }

  // If no data yet
  if (!weather || weather.length === 0) {
    return <p style={{ textAlign: 'center' }}>Search for a city to begin.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ margin: 'auto', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature (°F)</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
          <th>Map</th>
          <th>Set Default</th>
        </tr>
      </thead>
      <tbody>
        {weather.map((cityData) => {
          const temps = cityData.list.map((w) => w.main.temp);
          const cityName = cityData.city.name;
          const { lat, lon } = cityData.city.coord;

          const pressures = cityData.list.map((w) => w.main.pressure);
          const humidities = cityData.list.map((w) => w.main.humidity);

          // ✅ Use NEXT_PUBLIC variable for Next.js
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          console.log('Google Maps API Key:', apiKey);

          // ✅ Correct Google Maps Embed URL
          const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lon}`;

          return (
            <tr key={cityName}>
              <td style={{ textAlign: 'center' }}>{cityName}</td>
              <td><Chart data={temps} color="orange" units="°F" /></td>
              <td><Chart data={pressures} color="green" units="hPa" /></td>
              <td><Chart data={humidities} color="blue" units="%" /></td>
              <td>
                <iframe
                  title={cityName}
                  width="200"
                  height="125"
                  src={mapSrc}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => handleSetDefault(cityName)}>
                  Set as Default
                </button>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          alert(`Current location: ${latitude}, ${longitude}`);
                        },
                        (err) => {
                          alert('Unable to retrieve location: ' + err.message);
                        }
                      );
                    } else {
                      alert('Geolocation is not supported by your browser.');
                    }
                  }}
                >
                  📍 Look Up Current Location
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeatherList;
