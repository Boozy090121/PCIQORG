import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebaseService from '../../../services/firebase';
import { Button, Box } from '@mui/material';
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material';

const PersistenceManager = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth) || {};
  const appState = useSelector((state) => ({
    orgChart: state.orgChart,
    phase: state.phase,
    role: state.role,
    personnel: state.personnel,
    focusFactory: state.focusFactory,
    implementationTracking: state.implementationTracking,
    transitionPlan: state.transitionPlan
  }));

  // Load state on component mount
  useEffect(() => {
    const loadState = async () => {
      if (currentUser) {
        try {
          const result = await firebaseService.loadAppState();
          if (result.success && result.state) {
            // Dispatch actions to restore state
            Object.entries(result.state).forEach(([slice, state]) => {
              if (state) {
                dispatch({ type: `${slice}/setState`, payload: state });
              }
            });
          }
        } catch (error) {
          console.error('Error loading state:', error);
        }
      }
    };

    loadState();
  }, [currentUser, dispatch]);

  // Auto-save state changes
  useEffect(() => {
    const saveState = async () => {
      if (currentUser) {
        try {
          await firebaseService.saveAppState(appState);
        } catch (error) {
          console.error('Error saving state:', error);
        }
      }
    };

    // Debounce save operations
    const timeoutId = setTimeout(saveState, 1000);
    return () => clearTimeout(timeoutId);
  }, [appState, currentUser]);

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving project...');
  };

  const handleOpen = () => {
    // Implement open functionality
    console.log('Opening project...');
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={handleSave}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        startIcon={<OpenIcon />}
        onClick={handleOpen}
      >
        Open
      </Button>
    </Box>
  );
};

export default PersistenceManager; 