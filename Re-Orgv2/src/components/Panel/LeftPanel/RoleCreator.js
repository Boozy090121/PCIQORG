import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton, Box, Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addRole } from '../../../features/Organization/roleSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';

const RoleCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const [roleData, setRoleData] = useState({
    title: '',
    department: '',
    skills: [],
    responsibilities: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');

  const handleInputChange = (field) => (event) => {
    setRoleData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setRoleData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setRoleData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setRoleData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleDeleteResponsibility = (respToDelete) => {
    setRoleData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(resp => resp !== respToDelete)
    }));
  };

  const handleSubmit = () => {
    dispatch(addRole({
      factory: currentFactory,
      role: {
        ...roleData,
        id: Date.now().toString()
      }
    }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Create New Role
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Role Title"
            value={roleData.title}
            onChange={handleInputChange('title')}
            fullWidth
            required
          />
          <TextField
            label="Department"
            value={roleData.department}
            onChange={handleInputChange('department')}
            fullWidth
          />
          
          <Box>
            <TextField
              label="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              fullWidth
            />
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {roleData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                />
              ))}
            </Box>
          </Box>
          
          <Box>
            <TextField
              label="Add Responsibility"
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddResponsibility()}
              fullWidth
              multiline
            />
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {roleData.responsibilities.map((resp, index) => (
                <Chip
                  key={index}
                  label={resp}
                  onDelete={() => handleDeleteResponsibility(resp)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={!roleData.title.trim()}
        >
          Create Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleCreator; 