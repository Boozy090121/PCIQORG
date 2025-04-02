import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { updateFactory, deleteFactory } from '../../features/Organization/factorySlice';

/**
 * FactoryDetails component for displaying and managing factory information
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @returns {JSX.Element} FactoryDetails component
 */
export const FactoryDetails = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const factory = useSelector(selectCurrentFactory);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (factory) {
      setFormData({
        name: factory.name || '',
        location: factory.location || '',
        departments: factory.departments || [],
        timezone: factory.timezone || '',
        workingHours: factory.workingHours || { start: '', end: '' },
        holidays: factory.holidays || []
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

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [name]: value
      }
    }));
  };

  const handleAddDepartment = () => {
    const newDepartment = prompt('Enter new department:');
    if (newDepartment) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, newDepartment]
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
    const newHoliday = prompt('Enter new holiday (YYYY-MM-DD):');
    if (newHoliday) {
      setFormData(prev => ({
        ...prev,
        holidays: [...prev.holidays, newHoliday]
      }));
    }
  };

  const handleRemoveHoliday = (holiday) => {
    setFormData(prev => ({
      ...prev,
      holidays: prev.holidays.filter(h => h !== holiday)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!factory) return;

    dispatch(updateFactory({
      id: factory.id,
      ...formData
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this factory? This action cannot be undone.')) {
      dispatch(deleteFactory(factory.id));
      onClose();
    }
  };

  if (!factory) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {factory.name}
          </Typography>
          <Box>
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  label="Working Hours Start"
                  name="start"
                  type="time"
                  value={formData.workingHours.start}
                  onChange={handleWorkingHoursChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Working Hours End"
                  name="end"
                  type="time"
                  value={formData.workingHours.end}
                  onChange={handleWorkingHoursChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Departments
              </Typography>
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
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddDepartment}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Department
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Holidays
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.holidays.map((holiday) => (
                  <Chip
                    key={holiday}
                    label={new Date(holiday).toLocaleDateString()}
                    onDelete={() => handleRemoveHoliday(holiday)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddHoliday}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Holiday
              </Button>
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </form>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Location: {factory.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Timezone: {factory.timezone}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Working Hours: {factory.workingHours?.start} - {factory.workingHours?.end}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Departments
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {factory.departments?.map((department) => (
                  <Chip key={department} label={department} />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Holidays
              </Typography>
              <List>
                {factory.holidays?.map((holiday) => (
                  <ListItem key={holiday}>
                    <ListItemText
                      primary={new Date(holiday).toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

FactoryDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}; 