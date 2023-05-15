import React, { useState, useEffect } from 'react';
import LocationInput from './LocationInput';
import WeatherDisplay from './WeatherDisplay';
import NewsDisplay from './NewsDisplay';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleLocationChange = async (lat, lon) => {
    // Use the OpenWeatherAPI One Call API to fetch weather data for the given latitude and longitude
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  const handleNewsChange = async () => {
    // Use the New York Times API to fetch top news stories
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
    );
    const data = await response.json();
    setNewsData(data);
  };

  useEffect(() => {
    handleNewsChange();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather and News App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Weather" />
                <Tab label="News" />
              </Tabs>
            </Box>
            {tabValue === 0 && (
              <>
                <LocationInput onLocationChange={handleLocationChange} />
                {weatherData && (
                  <>
                    <WeatherDisplay weatherData={weatherData} />
                  </>
                )}
              </>
            )}
            {tabValue === 1 &&
              newsData && (
                <>
                  <NewsDisplay newsData={newsData} />
                </>
              )}
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default App;