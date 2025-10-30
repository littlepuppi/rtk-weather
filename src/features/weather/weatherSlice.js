import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '328194b3220e55747593aa5dc4c28a50';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const response = await axios.get(`${BASE_URL}?q=${city}&units=imperial&appid=${API_KEY}`);
  console.log(response);
  return response.data;
});

console.log('API Key:', API_KEY);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
