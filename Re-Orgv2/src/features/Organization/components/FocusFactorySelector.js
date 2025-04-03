import React from 'react';
import { Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFactory } from '@features/Organization/focusFactorySlice';

const FocusFactorySelector = () => {
  const dispatch = useDispatch();
  const { factories, currentFactory } = useSelector((state) => state.focusFactory);

  const handleFactoryChange = (event) => {
    const selectedFactory = factories.find(factory => factory.id === event.target.value);
    dispatch(setCurrentFactory(selectedFactory));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Focus Factory</InputLabel>
        <Select
          value={currentFactory?.id || ''}
          label="Focus Factory"
          onChange={handleFactoryChange}
        >
          {factories.map((factory) => (
            <MenuItem key={factory.id} value={factory.id}>
              {factory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default FocusFactorySelector; 