import React, { useState, useEffect } from 'react';
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
  IconButton,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateFactory } from '../../features/Organization/factorySlice';

/**
 * FactoryEditor component for editing existing factories
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {Object} props.factory - The factory to edit
 * @returns {JSX.Element} FactoryEditor component
 */
export const FactoryEditor = ({ open, onClose, factory }) => {
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

  useEffect(() => {
    if (factory) {
      setFormData({
        name: factory.name || '',
        location: factory.location || '',
        departments: factory.departments || [],
        newDepartment: '',
        settings: {
          timezone: factory.settings?.timezone || '',
          workingHours: factory.settings?.workingHours || '',
          holidays: factory.settings?.holidays || []
        }
      });
    }
  }, [factory]);

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

  const handleAddHoliday = () => {
    const newHoliday = prompt('Enter holiday date (YYYY-MM-DD):');
    if (newHoliday) {
      setFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          holidays: [...prev.settings.holidays, newHoliday]
        }
      }));
    }
  };

  const handleRemoveHoliday = (holiday) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        holidays: prev.settings.holidays.filter(h => h !== holiday)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !factory) return;

    const updatedFactory = {
      ...factory,
      ...formData,
      updatedAt: new Date().toISOString()
    };

    dispatch(updateFactory(updatedFactory));
    onClose();
  };

  if (!factory) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Factory</DialogTitle>
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

            <Divider />

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

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Holidays
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddHoliday}
                size="small"
                sx={{ mb: 1 }}
              >
                Add Holiday
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.settings.holidays.map((holiday) => (
                  <Chip
                    key={holiday}
                    label={holiday}
                    onDelete={() => handleRemoveHoliday(holiday)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

FactoryEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  factory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    departments: PropTypes.arrayOf(PropTypes.string),
    settings: PropTypes.shape({
      timezone: PropTypes.string,
      workingHours: PropTypes.string,
      holidays: PropTypes.arrayOf(PropTypes.string)
    })
  })
}; 