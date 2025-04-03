import React from 'react';
import { Box, Container, CssBaseline, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import AppHeader from '../Layout/AppHeader';
import FlexibleLayout from '../Layout/FlexibleLayout';
import LeftPanel from '../../Panel/LeftPanel/LeftPanel';
import CenterPanel from '../../Panel/CenterPanel/CenterPanel';
import RightPanel from '../../Panel/RightPanel/RightPanel';
import PhaseManager from '../PhaseManager';
import StateComparisonTool from '../PhaseManager/StateComparisonTool';
import ReportsAndAnalytics from '../Analytics/ReportsAndAnalytics';
import PersistenceManager from '../Persistence/PersistenceManager';
import Login from '../../Auth/Login';

const App = () => {
  const { currentUser, loading } = useSelector((state) => state.auth);
  const { loading: phaseLoading } = useSelector((state) => state.phase);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppHeader />
      <PersistenceManager />
      
      <Container maxWidth={false} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2 }}>
        <Box sx={{ mb: 2 }}>
          <PhaseManager />
        </Box>
        
        <FlexibleLayout>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </FlexibleLayout>
        
        <Box sx={{ mt: 2 }}>
          <StateComparisonTool />
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <ReportsAndAnalytics />
        </Box>
      </Container>
    </Box>
  );
};

export default App; 