import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const NewsDisplay = ({ newsData }) => {
  const [numStories, setNumStories] = useState(5);

  const handleLoadMoreClick = () => {
    setNumStories((prevNumStories) => prevNumStories + 5);
  };

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" component="div">
          Top News Stories
        </Typography>
        <List>
          {newsData.results.slice(0, numStories).map((story) => (
            <ListItem key={story.url} component="a" href={story.url}>
              <ListItemAvatar>
                {story.multimedia.length > 0 && (
                  <Avatar src={story.multimedia[0].url} alt={story.title} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={story.title}
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {story.byline}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      {story.abstract}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        {numStories < newsData.results.length && (
          <Button variant="contained" onClick={handleLoadMoreClick}>
            Load More Stories
          </Button>
        )}
      </Box>
    </>
  );
};

export default NewsDisplay;


