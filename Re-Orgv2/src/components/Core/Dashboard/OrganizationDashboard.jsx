import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Factory as FactoryIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { selectImplementationsByFactory } from '../../../features/Implementation/implementationTrackingSlice';
import {
  selectDashboardMetrics,
  selectDashboardTrends,
  selectDashboardLoading,
  selectDashboardError,
  fetchDashboardData
} from '../../../features/Dashboard/dashboardSlice';

const MetricCard = ({ icon, title, value, change, description, onClick }) => (
  <Card sx={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>{title}</Typography>
      </Box>
      <Typography variant="h3" sx={{ mb: 1 }}>{value}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {change > 0 ? (
          <ArrowUpwardIcon sx={{ color: 'success.main' }} />
        ) : (
          <ArrowDownwardIcon sx={{ color: 'error.main' }} />
        )}
        <Typography
          color={change > 0 ? 'success.main' : 'error.main'}
          variant="body2"
        >
          {Math.abs(change)}% from last period
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </CardContent>
  </Card>
);

const TrendSection = ({ title, data }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Tooltip title="View Details">
        <IconButton size="small">
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <List>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemIcon>
              {item.status === 'success' ? (
                <CheckCircleIcon color="success" />
              ) : item.status === 'warning' ? (
                <WarningIcon color="warning" />
              ) : (
                <TrendingUpIcon color="primary" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.description}
            />
          </ListItem>
          {index < data.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const implementations = useSelector(state => 
    selectImplementationsByFactory(state, currentFactory?.id || '')
  ) || [];
  const metrics = useSelector(selectDashboardMetrics);
  const trends = useSelector(selectDashboardTrends);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Organization Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={<FactoryIcon fontSize="large" color="primary" />}
            title="Focus Factories"
            value={metrics?.factories?.value || 0}
            change={metrics?.factories?.change || 0}
            description="Manage your focus factories and optimize resource allocation."
            onClick={() => navigate('/focus-factory')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={<TimelineIcon fontSize="large" color="primary" />}
            title="Phase Management"
            value={metrics?.phases?.value || 0}
            change={metrics?.phases?.change || 0}
            description="Track and update project phases and milestones."
            onClick={() => navigate('/implementation')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={<GroupIcon fontSize="large" color="primary" />}
            title="Resource Allocation"
            value={metrics?.resourceAllocation?.value || '0%'}
            change={metrics?.resourceAllocation?.change || 0}
            description="Allocate resources efficiently across your organization."
            onClick={() => navigate('/org-chart')}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>Recent Trends</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TrendSection
            title="Phase Progress"
            data={trends?.phaseProgress || []}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendSection
            title="Resource Distribution"
            data={trends?.resourceDistribution || []}
          />
        </Grid>
      </Grid>

      {implementations.length > 0 && (
        <>
          <Typography variant="h5" sx={{ my: 3 }}>Implementation Progress</Typography>
          <Grid container spacing={3}>
            {implementations.map((impl, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{impl.title}</Typography>
                    <Typography variant="body2">{impl.progress}% Complete</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={impl.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Start: {new Date(impl.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(impl.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default OrganizationDashboard; 