import React, { useState, useEffect } from 'react';
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
import { updatePersonnel } from '../../../features/Organization/personnelSlice';
import { selectRolesByFactory } from '../../../features/Organization/roleSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';

/**
 * PersonnelEditor component for editing existing personnel in the organization
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls dialog visibility
 * @param {Function} props.onClose - Callback function when dialog is closed
 * @param {Object} props.person - The personnel to edit
 * @returns {JSX.Element} PersonnelEditor component
 */
export const PersonnelEditor = ({ open, onClose, person }) => {
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

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || '',
        currentRole: person.currentRole || '',
        skills: person.skills || [],
        newSkill: '',
        email: person.email || '',
        phone: person.phone || ''
      });
    }
  }, [person]);

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

    dispatch(updatePersonnel({
      ...person,
      ...formData,
      skills: formData.skills
    }));

    onClose();
  };

  if (!person) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Personnel</DialogTitle>
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PersonnelEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  })
}; 