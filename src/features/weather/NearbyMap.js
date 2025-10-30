import React from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';

const NearbyMap = ({ center, nearbyCities }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {nearbyCities.map((city) => (
          <Marker
            key={city.id}
            position={{
              lat: city.coord.lat,
              lng: city.coord.lon,
            }}
            onClick={() => setSelected(city)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.coord.lat,
              lng: selected.coord.lon,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ textAlign: 'center' }}>
              <h4>{selected.name}</h4>
              <p>{Math.round(selected.main.temp)}°F</p>
              <p>{selected.weather[0].main}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default NearbyMap;
