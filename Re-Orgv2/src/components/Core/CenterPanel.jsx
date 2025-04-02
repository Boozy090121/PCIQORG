import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Tabs, Tab } from '@mui/material';
import { DragDropContext } from './DragDropContext/DragDropContext';
import { OrgChartContent } from './OrgChartContent';
import { RoleHierarchy } from './RoleHierarchy';

/**
 * CenterPanel component that displays the organizational chart and handles drag and drop
 * @returns {JSX.Element} CenterPanel component
 */
export const CenterPanel = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Organizational Chart" />
          <Tab label="Role Hierarchy" />
        </Tabs>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {activeTab === 0 ? (
          <DragDropContext>
            <OrgChartContent />
          </DragDropContext>
        ) : (
          <RoleHierarchy />
        )}
      </Box>
    </Paper>
  );
}; 