import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ReportsAndAnalytics = () => {
  const { tasks, milestones } = useSelector((state) => state.implementationTracking);
  const { personnel } = useSelector((state) => state.personnel);

  // Sample data for the chart
  const data = [
    { name: 'Tasks', value: tasks.length },
    { name: 'Milestones', value: milestones.length },
    { name: 'Personnel', value: personnel.length }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Overview Statistics
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Add more reports and analytics content here */}
      </Grid>
    </Box>
  );
};

export default ReportsAndAnalytics; 