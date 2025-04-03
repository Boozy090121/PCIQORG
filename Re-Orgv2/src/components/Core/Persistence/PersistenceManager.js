import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material';
import { useState } from 'react';

const PersistenceManager = () => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
=======
import firebaseService from '../../../services/firebase';
import { Button, Box } from '@mui/material';
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material';

const PersistenceManager = () => {
  const dispatch = useDispatch();
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
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

<<<<<<< HEAD
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Load state on component mount
  useEffect(() => {
    const loadState = () => {
      if (currentUser) {
        try {
          const savedState = localStorage.getItem('reorgAppState');
          if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            // Dispatch actions to restore state
            Object.entries(parsedState).forEach(([slice, state]) => {
              if (state && slice !== 'auth') { // Skip auth to prevent logout
                dispatch({ type: `${slice}/setState`, payload: state });
              }
            });
            
            showSnackbar('Project loaded from localStorage');
          }
        } catch (error) {
          console.error('Error loading state:', error);
          showSnackbar('Failed to load saved project', 'error');
=======
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
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
        }
      }
    };

    loadState();
  }, [currentUser, dispatch]);

  // Auto-save state changes
  useEffect(() => {
<<<<<<< HEAD
    const saveState = () => {
      if (currentUser) {
        try {
          localStorage.setItem('reorgAppState', JSON.stringify(appState));
          console.log('Auto-saved to localStorage');
        } catch (error) {
          console.error('Error auto-saving state:', error);
=======
    const saveState = async () => {
      if (currentUser) {
        try {
          await firebaseService.saveAppState(appState);
        } catch (error) {
          console.error('Error saving state:', error);
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
        }
      }
    };

    // Debounce save operations
<<<<<<< HEAD
    const timeoutId = setTimeout(saveState, 2000);
=======
    const timeoutId = setTimeout(saveState, 1000);
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
    return () => clearTimeout(timeoutId);
  }, [appState, currentUser]);

  const handleSave = () => {
<<<<<<< HEAD
    if (currentUser) {
      try {
        localStorage.setItem('reorgAppState', JSON.stringify(appState));
        showSnackbar('Project saved successfully');
      } catch (error) {
        console.error('Error manually saving state:', error);
        showSnackbar('Failed to save project', 'error');
      }
    }
  };

  const handleOpen = () => {
    const savedState = localStorage.getItem('reorgAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
        // Dispatch actions to restore state
        Object.entries(parsedState).forEach(([slice, state]) => {
          if (state && slice !== 'auth') {
            dispatch({ type: `${slice}/setState`, payload: state });
          }
        });
        
        showSnackbar('Project loaded successfully');
      } catch (error) {
        console.error('Error loading state:', error);
        showSnackbar('Failed to load project', 'error');
      }
    } else {
      showSnackbar('No saved project found', 'warning');
    }
  };

  if (!currentUser) return null;

  return (
    <>
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
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
=======
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
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  );
};

export default PersistenceManager; 