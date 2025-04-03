import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Extremely simplified component that should definitely load
function OrgChartView() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">
          Organization Chart
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is a simplified version of the organization chart.
        </Typography>
      </Paper>
    </Box>
  );
}

export default OrgChartView; 