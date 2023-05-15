import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" component="div">
          Current Weather
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
            alt={weatherData.current.weather[0].description}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1" component="div">
              Temperature:{' '}
              {((weatherData.current.temp - 273.15) * 9 / 5 + 32).toFixed(2)}°F
            </Typography>
            <Typography variant="body1" component="div">
              Humidity: {weatherData.current.humidity}%
            </Typography>
            <Typography variant="body1" component="div">
              {weatherData.hourly[0].pop * 100}% chance of precipitation
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" component="div">
              Hourly Forecast
            </Typography>
            <List>
              {weatherData.hourly.slice(0, 24).map((hour) => (
                <ListItem key={hour.dt}>
                  <ListItemAvatar>
                    <Avatar
                      src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={new Date(hour.dt * 1000).toLocaleTimeString()}
                    secondary={`${(
                      (hour.temp - 273.15) * 9 / 5 +
                      32
                    ).toFixed(2)}°F, ${hour.pop * 100}% chance of precipitation`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" component="div">
              Daily Forecast
            </Typography>
            <List>
              {weatherData.daily.map((day) => (
                <ListItem key={day.dt}>
                  <ListItemAvatar>
                    <Avatar
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={day.weather[0].description}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={new Date(day.dt * 1000).toLocaleDateString()}
                    secondary={`${(
                      (day.temp.day - 273.15) * 9 / 5 +
                      32
                    ).toFixed(2)}°F`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherDisplay;

