import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  Assignment as TaskIcon,
  Flag as MilestoneIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

const ImplementationTracking = () => {
  const { tasks, milestones, progress } = useSelector((state) => state.implementationTracking);
  const { currentFactory } = useSelector((state) => state.focusFactory);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Implementation Tracking
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Factory: {currentFactory?.name || 'Not selected'}
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Tasks" 
              secondary={`${tasks.length} total tasks`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <MilestoneIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Milestones" 
              secondary={`${milestones.length} milestones`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Progress" 
              secondary={`${Object.keys(progress).length} tracked items`} 
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default ImplementationTracking; 