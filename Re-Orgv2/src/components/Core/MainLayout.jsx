import React, { useState } from 'react';
import { Box, Grid, Paper, Tabs, Tab } from '@mui/material';
import { FactorySelector } from '../Panel/LeftPanel/FactorySelector';
import { RoleList } from '../Panel/LeftPanel/RoleList';
import { PersonnelList } from '../Panel/RightPanel/PersonnelList';
import { OrgChartContent } from './OrgChartContent';
import { RoleHierarchy } from './RoleHierarchy';
import { FactoryStats } from './FactoryStats';
import { DepartmentManager } from './DepartmentManager';
import { DepartmentAnalytics } from './DepartmentAnalytics';

/**
 * MainLayout component for the organization management system
 * @returns {JSX.Element} MainLayout component
 */
export const MainLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Factory Selection */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <FactorySelector />
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        {/* Left Panel */}
        <Paper sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column' }}>
          <RoleList />
        </Paper>

        {/* Center Panel */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Organizational Chart" />
              <Tab label="Role Hierarchy" />
              <Tab label="Department Management" />
              <Tab label="Department Analytics" />
              <Tab label="Factory Statistics" />
            </Tabs>
          </Paper>
          <Paper sx={{ flexGrow: 1, p: 2 }}>
            {activeTab === 0 && <OrgChartContent />}
            {activeTab === 1 && <RoleHierarchy />}
            {activeTab === 2 && <DepartmentManager />}
            {activeTab === 3 && <DepartmentAnalytics />}
            {activeTab === 4 && <FactoryStats />}
          </Paper>
        </Box>

        {/* Right Panel */}
        <Paper sx={{ width: 300, p: 2 }}>
          <PersonnelList />
        </Paper>
      </Box>
    </Box>
  );
}; 