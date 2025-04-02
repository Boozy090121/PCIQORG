import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Chip } from '@mui/material';
import { useSelector } from 'react-redux';

const PersonnelDirectory = () => {
  const personnel = useSelector(state => state.personnel.directory);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Personnel Directory
      </Typography>
      <List>
        {personnel.map((person, index) => (
          <ListItem key={index} divider>
            <Box display="flex" alignItems="center" width="100%">
              <Avatar src={person.avatar} alt={person.name} />
              <Box ml={2} flex={1}>
                <ListItemText
                  primary={person.name}
                  secondary={person.role}
                />
                <Box mt={1}>
                  {person.skills.map((skill, skillIndex) => (
                    <Chip
                      key={skillIndex}
                      label={skill}
                      size="small"
                      variant="outlined"
                      style={{ marginRight: 4, marginBottom: 4 }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {person.department}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PersonnelDirectory; 