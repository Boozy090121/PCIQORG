import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';

// Core Components
import AppHeader from '@core/Layout/AppHeader';
import FlexibleLayout from '@core/Layout/FlexibleLayout';
import PersistenceManager from '@core/Persistence/PersistenceManager';
import DashboardAnalytics from '@core/Dashboard/DashboardAnalytics';
import PhaseManager from '@core/PhaseManager/PhaseManager';
import StateComparisonTool from '@core/PhaseManager/StateComparisonTool';
import ReportsAndAnalytics from '@core/Analytics/ReportsAndAnalytics';

// Feature Components
import FocusFactorySelector from '@features/Organization/components/FocusFactorySelector';
import ImplementationTracking from '@features/Implementation/components/ImplementationTracking';
import TransitionPlan from '@features/Implementation/components/TransitionPlan';
import TrainingAnalysis from '@features/Training/components/TrainingAnalysis';

// Panel Components
import LeftPanel from '@components/Panel/LeftPanel/LeftPanel';
import CenterPanel from '@components/Panel/CenterPanel/CenterPanel';
import RightPanel from '@components/Panel/RightPanel/RightPanel';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box className="app-container">
      <AppHeader />
      
      <Box sx={{ display: 'flex', padding: 2, gap: 2 }}>
        <FocusFactorySelector />
        <PhaseManager />
        <Box sx={{ ml: 'auto' }}>
          <PersistenceManager />
        </Box>
      </Box>
      
      <Paper sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Organization Chart" />
          <Tab label="Phase Comparison" />
          <Tab label="Reports & Analytics" />
          <Tab label="Dashboard" />
        </Tabs>
      </Paper>

      {currentTab === 0 && (
        <FlexibleLayout>
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </FlexibleLayout>
      )}
      
      {currentTab === 1 && <StateComparisonTool />}
      
      {currentTab === 2 && <ReportsAndAnalytics />}
      
      {currentTab === 3 && <DashboardAnalytics />}
    </Box>
  );
}

export default App; 