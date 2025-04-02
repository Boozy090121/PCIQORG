import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton, Box, Chip, Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { addPersonnel } from '../../../features/Organization/personnelSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';

const PersonnelCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const [personnelData, setPersonnelData] = useState({
    name: '',
    currentRole: '',
    skills: [],
    experience: ''
  });
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field) => (event) => {
    setPersonnelData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setPersonnelData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setPersonnelData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleSubmit = () => {
    dispatch(addPersonnel({
      factory: currentFactory,
      personnel: {
        ...personnelData,
        id: Date.now().toString()
      }
    }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Personnel
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56 }}>
              <PersonIcon />
            </Avatar>
            <TextField
              label="Full Name"
              value={personnelData.name}
              onChange={handleInputChange('name')}
              fullWidth
              required
            />
          </Box>
          
          <TextField
            label="Current Role"
            value={personnelData.currentRole}
            onChange={handleInputChange('currentRole')}
            fullWidth
          />
          
          <TextField
            label="Experience"
            value={personnelData.experience}
            onChange={handleInputChange('experience')}
            fullWidth
            multiline
            rows={3}
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
              {personnelData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
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
          disabled={!personnelData.name.trim()}
        >
          Add Personnel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonnelCreator; 