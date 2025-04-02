import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Typography
} from '@mui/material';
import { addPersonnel } from '../../../features/Organization/personnelSlice';
import { selectRolesByFactory } from '../../../features/Organization/roleSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';

/**
 * PersonnelCreator component for adding new personnel to the organization
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls dialog visibility
 * @param {Function} props.onClose - Callback function when dialog is closed
 * @returns {JSX.Element} PersonnelCreator component
 */
export const PersonnelCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const roles = useSelector(state => selectRolesByFactory(state, currentFactory));

  const [formData, setFormData] = useState({
    name: '',
    currentRole: '',
    skills: [],
    newSkill: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    dispatch(addPersonnel({
      ...formData,
      id: `personnel-${Date.now()}`,
      skills: formData.skills
    }));

    setFormData({
      name: '',
      currentRole: '',
      skills: [],
      newSkill: '',
      email: '',
      phone: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Personnel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Full Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Current Role</InputLabel>
          <Select
            name="currentRole"
            value={formData.currentRole}
            onChange={handleInputChange}
            label="Current Role"
            required
          >
            {roles.map(role => (
              <MenuItem key={role.id} value={role.id}>
                {role.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="tel"
          fullWidth
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Skills</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              name="newSkill"
              label="New Skill"
              value={formData.newSkill}
              onChange={handleInputChange}
              size="small"
              fullWidth
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button onClick={handleAddSkill} variant="outlined">
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveSkill(index)}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.name.trim() || !formData.currentRole || !formData.email.trim() || !formData.phone.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PersonnelCreator.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}; 