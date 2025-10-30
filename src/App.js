import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from './components/SearchBar';
import WeatherList from './features/weather/WeatherList';
import { fetchWeather } from './features/weather/weatherSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const defaultCity = localStorage.getItem('defaultCity');
  console.log('Loading default city from localStorage:', defaultCity);
  
  if (defaultCity) {
    dispatch(fetchWeather(defaultCity));
  } else {
    console.log('No default city found in localStorage.');
  }
}, [dispatch]);

  
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Weather App</h1>
      <h2>RTK Weather Forecast</h2>
      <SearchBar />
      <WeatherList />
      <WeatherMap lat={latitude} lon={longitude} />
    </div>
  );
}

export default App;