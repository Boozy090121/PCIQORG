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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectRoleById } from '../../../features/Organization/roleSlice';
import { selectPersonnelByRole } from '../../../features/Organization/personnelSlice';
import { updateRole, deleteRole } from '../../../features/Organization/roleSlice';

/**
 * RoleDetails component for displaying and managing role information
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {string} props.roleId - ID of the role to display
 * @returns {JSX.Element} RoleDetails component
 */
export const RoleDetails = ({ open, onClose, roleId }) => {
  const dispatch = useDispatch();
  const role = useSelector(state => selectRoleById(state, roleId));
  const personnel = useSelector(state => selectPersonnelByRole(state, roleId));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    responsibilities: [],
    skills: []
  });

  useEffect(() => {
    if (role) {
      setFormData({
        title: role.title || '',
        department: role.department || '',
        responsibilities: role.responsibilities || [],
        skills: role.skills || []
      });
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResponsibility = () => {
    const newResponsibility = prompt('Enter new responsibility:');
    if (newResponsibility) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility]
      }));
    }
  };

  const handleRemoveResponsibility = (responsibility) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(r => r !== responsibility)
    }));
  };

  const handleAddSkill = () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) return;

    dispatch(updateRole({
      id: role.id,
      ...formData
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      dispatch(deleteRole(role.id));
      onClose();
    }
  };

  if (!role) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {role.title}
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
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Responsibilities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.responsibilities.map((responsibility) => (
                  <Chip
                    key={responsibility}
                    label={responsibility}
                    onDelete={() => handleRemoveResponsibility(responsibility)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddResponsibility}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Responsibility
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Required Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddSkill}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Skill
              </Button>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </form>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Department: {role.department}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Responsibilities
              </Typography>
              <List>
                {role.responsibilities?.map((responsibility, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={responsibility} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Required Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {role.skills?.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Personnel ({personnel.length})
              </Typography>
              <List>
                {personnel.map((person) => (
                  <ListItem key={person.id}>
                    <ListItemText
                      primary={person.name}
                      secondary={person.email}
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

RoleDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired
}; 