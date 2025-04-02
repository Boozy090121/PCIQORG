import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%'
}));

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Organization Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <Typography variant="h6">Focus Factories</Typography>
            <Typography variant="body1">
              Manage your focus factories and optimize resource allocation.
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <Typography variant="h6">Phase Management</Typography>
            <Typography variant="body1">
              Track and update project phases and milestones.
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Item>
            <Typography variant="h6">Resource Allocation</Typography>
            <Typography variant="body1">
              Allocate resources efficiently across your organization.
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 