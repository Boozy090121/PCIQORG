import React from 'react';
import { Box } from '@mui/material';

const FlexibleLayout = ({ children, direction = 'row', spacing = 2, ...props }) => {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      gap={spacing}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FlexibleLayout; 