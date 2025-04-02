import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectAllFactories, selectFactoriesLoading, selectFactoriesError } from '../../features/Organization/factorySlice';
import { addFactory, deleteFactory } from '../../features/Organization/factorySlice';
import { FactoryDetails } from './FactoryDetails';

/**
 * FactoryList component for displaying and managing factories
 * @returns {JSX.Element} FactoryList component
 */
export const FactoryList = () => {
  const dispatch = useDispatch();
  const factories = useSelector(selectAllFactories);
  const loading = useSelector(selectFactoriesLoading);
  const error = useSelector(selectFactoriesError);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFactory, setNewFactory] = useState({
    name: '',
    location: '',
    departments: [],
    timezone: '',
    workingHours: {
      start: '',
      end: ''
    },
    holidays: []
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateOpen(false);
    setNewFactory({
      name: '',
      location: '',
      departments: [],
      timezone: '',
      workingHours: {
        start: '',
        end: ''
      },
      holidays: []
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(addFactory(newFactory));
    handleCreateClose();
  };

  const handleEditClick = (factory) => {
    setSelectedFactory(factory);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (factoryId) => {
    if (window.confirm('Are you sure you want to delete this factory? This action cannot be undone.')) {
      dispatch(deleteFactory(factoryId));
    }
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedFactory(null);
  };

  const filteredFactories = factories.filter(factory =>
    factory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factory.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography>Loading factories...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Factories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add Factory
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Factories"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredFactories.map((factory) => (
          <ListItem
            key={factory.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={factory.name}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location: {factory.location}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {factory.departments?.map((department) => (
                      <Chip
                        key={department}
                        label={department}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleEditClick(factory)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDeleteClick(factory.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={isCreateOpen} onClose={handleCreateClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Factory</DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreateSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  value={newFactory.name}
                  onChange={(e) => setNewFactory({ ...newFactory, name: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  value={newFactory.location}
                  onChange={(e) => setNewFactory({ ...newFactory, location: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Timezone"
                  value={newFactory.timezone}
                  onChange={(e) => setNewFactory({ ...newFactory, timezone: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Working Hours Start"
                  type="time"
                  value={newFactory.workingHours.start}
                  onChange={(e) => setNewFactory({
                    ...newFactory,
                    workingHours: { ...newFactory.workingHours, start: e.target.value }
                  })}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Working Hours End"
                  type="time"
                  value={newFactory.workingHours.end}
                  onChange={(e) => setNewFactory({
                    ...newFactory,
                    workingHours: { ...newFactory.workingHours, end: e.target.value }
                  })}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <FactoryDetails
        open={isDetailsOpen}
        onClose={handleDetailsClose}
      />
    </Box>
  );
}; 