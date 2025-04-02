import React, { useState } from 'react';
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
  Button
} from '@mui/material';
import { addNode } from '../../../features/Organization/orgChartSlice';

export const OrgNodeCreator = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    type: 'position',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    dispatch(addNode({
      ...formData,
      id: `node-${Date.now()}`,
      x: 0,
      y: 0,
      width: 200,
      height: 100
    }));

    setFormData({
      title: '',
      type: 'position',
      description: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Node</DialogTitle>
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
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            label="Type"
          >
            <MenuItem value="position">Position</MenuItem>
            <MenuItem value="role">Role</MenuItem>
            <MenuItem value="department">Department</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 