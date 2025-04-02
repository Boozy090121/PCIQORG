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
  Box
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  FolderOpen as FolderOpenIcon
} from '@mui/icons-material';
import OrgChartPersistenceService from '../../../services/OrgChartPersistenceService';

const OrgChartSaveDialog = ({ open, onClose, onSave, onLoad, currentChartData }) => {
  const [savedCharts, setSavedCharts] = useState([]);
  const [newChartName, setNewChartName] = useState('');
  const [newChartDescription, setNewChartDescription] = useState('');
  const [selectedChart, setSelectedChart] = useState(null);

  useEffect(() => {
    if (open) {
      loadSavedCharts();
    }
  }, [open]);

  const loadSavedCharts = () => {
    const charts = OrgChartPersistenceService.getAllSavedCharts();
    setSavedCharts(charts);
  };

  const handleSave = () => {
    if (!newChartName.trim()) return;

    const savedChart = OrgChartPersistenceService.saveChart(
      currentChartData,
      newChartName,
      newChartDescription
    );

    onSave(savedChart);
    setNewChartName('');
    setNewChartDescription('');
    loadSavedCharts();
  };

  const handleLoad = (chart) => {
    onLoad(chart);
    onClose();
  };

  const handleDelete = (chartId) => {
    OrgChartPersistenceService.deleteChart(chartId);
    loadSavedCharts();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Save/Load Organization Chart</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Save New Chart</Typography>
          <TextField
            fullWidth
            label="Chart Name"
            value={newChartName}
            onChange={(e) => setNewChartName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description (optional)"
            value={newChartDescription}
            onChange={(e) => setNewChartDescription(e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!newChartName.trim()}
            sx={{ mt: 2 }}
          >
            Save Chart
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Saved Charts</Typography>
        <List>
          {savedCharts.map((chart) => (
            <ListItem
              key={chart.id}
              button
              onClick={() => setSelectedChart(chart)}
              selected={selectedChart?.id === chart.id}
            >
              <ListItemText
                primary={chart.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {chart.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="text.secondary">
                      Last saved: {new Date(chart.timestamp).toLocaleString()}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="load"
                  onClick={() => handleLoad(chart)}
                  sx={{ mr: 1 }}
                >
                  <FolderOpenIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(chart.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {savedCharts.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No saved charts found
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

export default OrgChartSaveDialog; 