import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { addFactory } from '../../features/Organization/factorySlice';

/**
 * FactoryCreator component for adding new factories
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @returns {JSX.Element} FactoryCreator component
 */
export const FactoryCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    departments: [],
    newDepartment: '',
    settings: {
      timezone: '',
      workingHours: '',
      holidays: []
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDepartment = () => {
    if (formData.newDepartment.trim()) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, prev.newDepartment.trim()],
        newDepartment: ''
      }));
    }
  };

  const handleRemoveDepartment = (department) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter(d => d !== department)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newFactory = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(addFactory(newFactory));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Factory</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Factory Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Departments
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  label="New Department"
                  value={formData.newDepartment}
                  onChange={(e) => setFormData(prev => ({ ...prev, newDepartment: e.target.value }))}
                  size="small"
                  fullWidth
                />
                <IconButton onClick={handleAddDepartment} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.departments.map((department) => (
                  <Chip
                    key={department}
                    label={department}
                    onDelete={() => handleRemoveDepartment(department)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Settings
              </Typography>
              <TextField
                label="Timezone"
                name="timezone"
                value={formData.settings.timezone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, timezone: e.target.value }
                }))}
                fullWidth
                size="small"
              />
              <TextField
                label="Working Hours"
                name="workingHours"
                value={formData.settings.workingHours}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, workingHours: e.target.value }
                }))}
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Factory
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

FactoryCreator.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}; 