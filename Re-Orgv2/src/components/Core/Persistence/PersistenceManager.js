import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material';
import { useState } from 'react';

const PersistenceManager = () => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
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
        }
      }
    };

    loadState();
  }, [currentUser, dispatch]);

  // Auto-save state changes
  useEffect(() => {
    const saveState = () => {
      if (currentUser) {
        try {
          localStorage.setItem('reorgAppState', JSON.stringify(appState));
          console.log('Auto-saved to localStorage');
        } catch (error) {
          console.error('Error auto-saving state:', error);
        }
      }
    };

    // Debounce save operations
    const timeoutId = setTimeout(saveState, 2000);
    return () => clearTimeout(timeoutId);
  }, [appState, currentUser]);

  const handleSave = () => {
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
  );
};

export default PersistenceManager; 