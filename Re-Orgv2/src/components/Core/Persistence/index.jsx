import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveState, loadState } from '@store/persistenceSlice';

const PersistenceManager = () => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(saveState());
  };

  const handleLoad = () => {
    dispatch(loadState());
  };

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="persistence controls">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleLoad}>Load</Button>
      </ButtonGroup>
    </Box>
  );
};

export default PersistenceManager; 