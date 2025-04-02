import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';

const SuccessionPlanning = () => {
  const succession = useSelector(state => state.succession);
  const { plans, candidates } = succession;

  return (
    <Box>
      <Typography variant="h5">Succession Planning</Typography>
      <List>
        {plans.map((plan, index) => (
          <ListItem key={index}>
            <Box>
              <Typography variant="subtitle1">{plan.role}</Typography>
              <Typography variant="body2">
                Current: {plan.current}
              </Typography>
              <Typography variant="body2">
                Successor: {plan.successor}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SuccessionPlanning; 