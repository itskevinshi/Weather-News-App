import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const LocationInput = ({ onLocationChange }) => {
  const [location, setLocation] = useState('');

  const handleLocationSubmit = async (event) => {
    event.preventDefault();
    if (location) {
      // Use the OpenWeatherAPI Geocoding API to convert the location into latitude and longitude
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        onLocationChange(lat, lon);
      }
    } else {
      // Use the HTML Geolocation API to get the user's current location
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        onLocationChange(latitude, longitude);
      });
    }
  };

  return (
    <form onSubmit={handleLocationSubmit}>
      <Stack spacing={2} sx={{ my: 2 }}>
        <TextField
          label="Enter a location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <Button variant="contained" type="submit">
          Get Weather
        </Button>
      </Stack>
    </form>
  );
};

export default LocationInput;

