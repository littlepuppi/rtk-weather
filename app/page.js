'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../src/components/SearchBar';
import WeatherList from '../src/features/weather/WeatherList';
import { fetchWeather } from '../src/features/weather/weatherSlice';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultCity = localStorage.getItem('defaultCity');
    if (defaultCity) {
      dispatch(fetchWeather(defaultCity));
    }
  }, [dispatch]);

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>RTK Weather Forecast</h1>
      <SearchBar />
      <WeatherList />
    </main>
  );
}