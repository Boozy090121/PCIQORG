import React from 'react';
import { Box } from '@mui/material';
import { LeftPanel } from '../../Panel/LeftPanel/LeftPanel';
import { CenterPanel } from '../../Panel/CenterPanel/CenterPanel';
import { RightPanel } from '../../Panel/RightPanel/RightPanel';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)', // Subtract AppHeader height
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </Box>
  );
};

export default MainLayout; 