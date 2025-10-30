import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../src/features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
