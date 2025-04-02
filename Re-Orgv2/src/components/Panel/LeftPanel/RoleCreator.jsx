import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
import { addRole } from '../../../features/Organization/roleSlice';

/**
 * RoleCreator component for creating new roles in the organization
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls dialog visibility
 * @param {Function} props.onClose - Callback function when dialog is closed
 * @returns {JSX.Element} RoleCreator component
 */
export const RoleCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    responsibilities: [],
    skills: [],
    newResponsibility: '',
    newSkill: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResponsibility = () => {
    if (formData.newResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, prev.newResponsibility.trim()],
        newResponsibility: ''
      }));
    }
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

  const handleRemoveResponsibility = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    dispatch(addRole({
      ...formData,
      id: `role-${Date.now()}`,
      responsibilities: formData.responsibilities,
      skills: formData.skills
    }));

    setFormData({
      title: '',
      department: '',
      responsibilities: [],
      skills: [],
      newResponsibility: '',
      newSkill: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Role</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          name="department"
          label="Department"
          type="text"
          fullWidth
          value={formData.department}
          onChange={handleInputChange}
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Responsibilities</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              name="newResponsibility"
              label="New Responsibility"
              value={formData.newResponsibility}
              onChange={handleInputChange}
              size="small"
              fullWidth
              onKeyPress={(e) => e.key === 'Enter' && handleAddResponsibility()}
            />
            <Button onClick={handleAddResponsibility} variant="outlined">
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.responsibilities.map((resp, index) => (
              <Chip
                key={index}
                label={resp}
                onDelete={() => handleRemoveResponsibility(index)}
              />
            ))}
          </Box>
        </Box>

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
          disabled={!formData.title.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RoleCreator.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}; 