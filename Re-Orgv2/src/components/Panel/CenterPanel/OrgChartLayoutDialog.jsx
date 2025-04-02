import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Box,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Restore as RestoreIcon
} from '@mui/icons-material';
import OrgChartPersistenceService from '../../../services/OrgChartPersistenceService';

const OrgChartLayoutDialog = ({ open, onClose, onSave, onLoad, currentChartId, currentLayout }) => {
  const [savedLayouts, setSavedLayouts] = useState([]);
  const [newLayoutName, setNewLayoutName] = useState('');
  const [selectedLayout, setSelectedLayout] = useState(null);

  useEffect(() => {
    if (open && currentChartId) {
      loadSavedLayouts();
    }
  }, [open, currentChartId]);

  const loadSavedLayouts = () => {
    const layouts = OrgChartPersistenceService.getChartLayouts(currentChartId);
    setSavedLayouts(layouts);
  };

  const handleSave = () => {
    if (!newLayoutName.trim() || !currentLayout) return;

    const savedLayout = OrgChartPersistenceService.saveLayout(
      currentChartId,
      currentLayout,
      newLayoutName
    );

    onSave(savedLayout);
    setNewLayoutName('');
    loadSavedLayouts();
  };

  const handleLoad = (layout) => {
    onLoad(layout);
    onClose();
  };

  const handleDelete = (layoutId) => {
    OrgChartPersistenceService.deleteLayout(layoutId);
    loadSavedLayouts();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Manage Chart Layouts</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Save Current Layout</Typography>
          <TextField
            fullWidth
            label="Layout Name"
            value={newLayoutName}
            onChange={(e) => setNewLayoutName(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!newLayoutName.trim() || !currentLayout}
            sx={{ mt: 2 }}
          >
            Save Layout
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Saved Layouts</Typography>
        <List>
          {savedLayouts.map((layout) => (
            <ListItem
              key={layout.id}
              button
              onClick={() => setSelectedLayout(layout)}
              selected={selectedLayout?.id === layout.id}
            >
              <ListItemText
                primary={layout.name}
                secondary={
                  <Typography component="span" variant="caption" color="text.secondary">
                    Saved: {new Date(layout.timestamp).toLocaleString()}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="restore"
                  onClick={() => handleLoad(layout)}
                  sx={{ mr: 1 }}
                >
                  <RestoreIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(layout.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {savedLayouts.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No saved layouts found for this chart
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrgChartLayoutDialog; 