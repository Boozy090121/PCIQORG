import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { selectRolesByDepartment } from '../../features/Organization/roleSlice';
import { selectPersonnelByDepartment } from '../../features/Organization/personnelSlice';
import { updateFactory } from '../../features/Organization/factorySlice';

/**
 * DepartmentManager component for managing departments within a factory
 * @returns {JSX.Element} DepartmentManager component
 */
export const DepartmentManager = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateSubmit = () => {
    if (newDepartment && currentFactory) {
      const updatedDepartments = [...(currentFactory.departments || []), newDepartment];
      dispatch(updateFactory({
        id: currentFactory.id,
        departments: updatedDepartments
      }));
      setNewDepartment('');
      setIsCreating(false);
    }
  };

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setNewDepartment(department);
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    if (newDepartment && currentFactory && selectedDepartment) {
      const updatedDepartments = currentFactory.departments.map(d =>
        d === selectedDepartment ? newDepartment : d
      );
      dispatch(updateFactory({
        id: currentFactory.id,
        departments: updatedDepartments
      }));
      setNewDepartment('');
      setIsEditing(false);
      setSelectedDepartment(null);
    }
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedDepartment && currentFactory) {
      const updatedDepartments = currentFactory.departments.filter(
        d => d !== selectedDepartment
      );
      dispatch(updateFactory({
        id: currentFactory.id,
        departments: updatedDepartments
      }));
      setIsDeleting(false);
      setSelectedDepartment(null);
    }
  };

  if (!currentFactory) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please select a factory to manage departments
        </Typography>
      </Box>
    );
  }

  const filteredDepartments = (currentFactory.departments || []).filter(department =>
    department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Departments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add Department
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Departments"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2}>
        {filteredDepartments.map((department) => {
          const roles = useSelector(state => selectRolesByDepartment(state, department));
          const personnel = useSelector(state => selectPersonnelByDepartment(state, department));

          return (
            <Grid item xs={12} key={department}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">{department}</Typography>
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditClick(department)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteClick(department)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={`${roles.length} Roles`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`${personnel.length} Personnel`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Roles:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {roles.map((role) => (
                      <Chip
                        key={role.id}
                        label={role.title}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            fullWidth
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreating(false)}>Cancel</Button>
          <Button onClick={handleCreateSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            fullWidth
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Department</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedDepartment}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 