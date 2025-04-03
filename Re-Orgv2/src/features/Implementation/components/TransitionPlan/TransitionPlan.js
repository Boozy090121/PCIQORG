import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  Timeline as TimelineIcon,
  Assignment as TaskIcon,
  Group as GroupIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const TransitionPlan = () => {
  const { currentPhase } = useSelector((state) => state.phase);
  const { currentFactory } = useSelector((state) => state.focusFactory);
  const { tasks } = useSelector((state) => state.implementationTracking);
  const { personnel } = useSelector((state) => state.personnel);
  const { roles } = useSelector((state) => state.role);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transition Plan
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Phase: {currentPhase?.name || 'Not selected'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Focus Factory: {currentFactory?.name || 'Not selected'}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <List>
          <ListItem>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Timeline" 
              secondary={`${tasks.length} tasks planned`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Personnel" 
              secondary={`${personnel.length} team members`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Roles" 
              secondary={`${roles.length} defined roles`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Tasks" 
              secondary={`${tasks.filter(task => task.status === 'completed').length} completed`} 
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default TransitionPlan; 