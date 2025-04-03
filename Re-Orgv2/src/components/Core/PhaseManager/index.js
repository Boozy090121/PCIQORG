import React from 'react';
import { Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPhase } from '../../../features/Phase/phaseSlice';

const PhaseManager = () => {
  const dispatch = useDispatch();
  const { phases, currentPhase } = useSelector((state) => state.phase);

  const handlePhaseChange = (event) => {
    const selectedPhase = phases.find(phase => phase.id === event.target.value);
    dispatch(setCurrentPhase(selectedPhase));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Phase Manager
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="phase-select-label">Current Phase</InputLabel>
          <Select
            labelId="phase-select-label"
            id="phase-select"
            value={currentPhase?.id || ''}
            label="Current Phase"
            onChange={handlePhaseChange}
          >
            {phases.map(phase => (
              <MenuItem key={phase.id} value={phase.id}>
                {phase.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default PhaseManager; 