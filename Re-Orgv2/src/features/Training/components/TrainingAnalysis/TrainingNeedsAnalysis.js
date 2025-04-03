import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  School as TrainingIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

const TrainingNeedsAnalysis = () => {
  const { personnel } = useSelector((state) => state.personnel);
  const { roles } = useSelector((state) => state.role);
  const { currentPhase } = useSelector((state) => state.phase);

  // Calculate training statistics
  const totalPersonnel = personnel.length;
  const totalRoles = roles.length;
  const trainingNeeded = personnel.filter(person => person.trainingNeeded).length;
  const trainingCompleted = personnel.filter(person => person.trainingCompleted).length;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Training Needs Analysis
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Phase: {currentPhase?.name || 'Not selected'}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Total Personnel" 
              secondary={`${totalPersonnel} team members`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Total Roles" 
              secondary={`${totalRoles} defined roles`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TrainingIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Training Needed" 
              secondary={`${trainingNeeded} personnel require training`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Training Completed" 
              secondary={`${trainingCompleted} personnel completed training`} 
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default TrainingNeedsAnalysis; 