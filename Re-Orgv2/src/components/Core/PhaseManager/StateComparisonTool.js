import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const StateComparisonTool = () => {
  const { phases, currentPhase } = useSelector((state) => state.phase);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Phase Comparison
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Phase: {currentPhase?.name || 'Not set'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Phases: {phases.length}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Add more comparison content here */}
      </Grid>
    </Box>
  );
};

export default StateComparisonTool; 