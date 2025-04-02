import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, Stack, Fade } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Track_Changes as TrackChangesIcon 
} from '@mui/icons-material';
import { FactorySelector } from '../Core/FactorySelector';
import { FactoryList } from '../Core/FactoryList';
import { RoleList } from '../Panel/LeftPanel/RoleList';
import { PersonnelList } from '../Panel/RightPanel/PersonnelList';
import { OrgChartContent } from '../Core/OrgChartContent';
import { LoadingSpinner } from '../Core/LoadingSpinner';
import { useSelector } from 'react-redux';

/**
 * MainLayout component that arranges the application's main components
 * @returns {JSX.Element} MainLayout component
 */
export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const loading = useSelector(state => state.phase.loading || state.transitionPlan.loading || state.implementationTracking.loading);

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  useEffect(() => {
    setIsTransitioning(false);
  }, [location]);

  if (loading) {
    return <LoadingSpinner message="Loading organization data..." />;
  }

  return (
    <Fade in={!isTransitioning} timeout={300}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <FactorySelector />
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2}>
                <Button
                  variant={isActive('/training') ? "contained" : "outlined"}
                  startIcon={<SchoolIcon />}
                  onClick={() => handleNavigation('/training')}
                  disabled={isTransitioning}
                >
                  Training Analysis
                </Button>
                <Button
                  variant={isActive('/transition-plan') ? "contained" : "outlined"}
                  startIcon={<TimelineIcon />}
                  onClick={() => handleNavigation('/transition-plan')}
                  disabled={isTransitioning}
                >
                  Transition Plan
                </Button>
                <Button
                  variant={isActive('/implementation') ? "contained" : "outlined"}
                  startIcon={<TrackChangesIcon />}
                  onClick={() => handleNavigation('/implementation')}
                  disabled={isTransitioning}
                >
                  Implementation Tracking
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Panel - Factory and Role Management */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Organization Management
              </Typography>
              <FactoryList />
              <RoleList />
            </Paper>
          </Grid>

          {/* Center Panel - Organizational Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Organizational Chart
              </Typography>
              <OrgChartContent />
            </Paper>
          </Grid>

          {/* Right Panel - Personnel Management */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Personnel Management
              </Typography>
              <PersonnelList />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}; 