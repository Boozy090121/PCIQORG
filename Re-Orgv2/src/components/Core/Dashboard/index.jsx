import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

const DashboardAnalytics = () => {
  const analytics = useSelector(state => state.dashboard);
  const { metrics, trends } = analytics;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Analytics
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.label}
                </Typography>
                <Typography variant="h5" component="h2">
                  {metric.value}
                </Typography>
                <Typography variant="body2" color={metric.trend > 0 ? "success.main" : "error.main"}>
                  {metric.trend > 0 ? "+" : ""}{metric.trend}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Trends
        </Typography>
        <Grid container spacing={3}>
          {trends.map((trend, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{trend.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {trend.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardAnalytics; 