import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPhase } from '@store/phaseSlice';

const PhaseManager = () => {
  const dispatch = useDispatch();
  const currentPhase = useSelector(state => state.phase.current);
  const phases = ['Current', 'Future', 'Transition'];

  const handlePhaseChange = (phase) => {
    dispatch(setCurrentPhase(phase));
  };

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="phase selection">
        {phases.map((phase) => (
          <Button
            key={phase}
            onClick={() => handlePhaseChange(phase)}
            variant={currentPhase === phase ? 'contained' : 'outlined'}
          >
            {phase}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default PhaseManager; 