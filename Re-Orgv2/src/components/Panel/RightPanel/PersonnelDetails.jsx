import React, { useState } from 'react';
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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectPersonnelById } from '../../../features/Organization/personnelSlice';
import { selectRoleById } from '../../../features/Organization/roleSlice';
import { updatePersonnel, addPerformanceReview, addTraining, addLeave } from '../../../features/Organization/personnelSlice';

/**
 * PersonnelDetails component for displaying and managing personnel information
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {string} props.personnelId - ID of the personnel to display
 * @returns {JSX.Element} PersonnelDetails component
 */
export const PersonnelDetails = ({ open, onClose, personnelId }) => {
  const dispatch = useDispatch();
  const personnel = useSelector(state => selectPersonnelById(state, personnelId));
  const currentRole = useSelector(state => selectRoleById(state, personnel?.currentRole));
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: []
  });

  React.useEffect(() => {
    if (personnel) {
      setFormData({
        name: personnel.name || '',
        email: personnel.email || '',
        phone: personnel.phone || '',
        skills: personnel.skills || []
      });
    }
  }, [personnel]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (!personnel) return;

    dispatch(updatePersonnel({
      id: personnel.id,
      ...formData
    }));
    setIsEditing(false);
  };

  const handleAddPerformanceReview = () => {
    const review = {
      rating: prompt('Enter rating (1-5):'),
      feedback: prompt('Enter feedback:'),
      reviewer: prompt('Enter reviewer name:')
    };

    if (review.rating && review.feedback) {
      dispatch(addPerformanceReview({
        personnelId: personnel.id,
        review
      }));
    }
  };

  const handleAddTraining = () => {
    const training = {
      name: prompt('Enter training name:'),
      provider: prompt('Enter training provider:'),
      completionDate: prompt('Enter completion date (YYYY-MM-DD):'),
      certificate: prompt('Enter certificate number (optional):')
    };

    if (training.name && training.provider) {
      dispatch(addTraining({
        personnelId: personnel.id,
        training
      }));
    }
  };

  const handleAddLeave = () => {
    const leave = {
      type: prompt('Enter leave type (e.g., vacation, sick):'),
      startDate: prompt('Enter start date (YYYY-MM-DD):'),
      endDate: prompt('Enter end date (YYYY-MM-DD):'),
      reason: prompt('Enter reason:')
    };

    if (leave.type && leave.startDate && leave.endDate) {
      dispatch(addLeave({
        personnelId: personnel.id,
        leave
      }));
    }
  };

  if (!personnel) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {personnel.name}
          </Typography>
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            <EditIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Details" />
          <Tab label="Performance" />
          <Tab label="Training" />
          <Tab label="Leave" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
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
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
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
                  Email: {personnel.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone: {personnel.phone}
                </Typography>
                {currentRole && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Role: {currentRole.title}
                  </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {personnel.skills?.map((skill) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddPerformanceReview}
              sx={{ mb: 2 }}
            >
              Add Performance Review
            </Button>
            <List>
              {personnel.performanceReviews?.map((review) => (
                <ListItem key={review.id}>
                  <ListItemText
                    primary={`Rating: ${review.rating}/5`}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {review.feedback}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Reviewed by: {review.reviewer} on {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddTraining}
              sx={{ mb: 2 }}
            >
              Add Training
            </Button>
            <List>
              {personnel.trainings?.map((training) => (
                <ListItem key={training.id}>
                  <ListItemText
                    primary={training.name}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Provider: {training.provider}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Completion Date: {new Date(training.completionDate).toLocaleDateString()}
                        </Typography>
                        {training.certificate && (
                          <Typography variant="body2" color="text.secondary">
                            Certificate: {training.certificate}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddLeave}
              sx={{ mb: 2 }}
            >
              Add Leave
            </Button>
            <List>
              {personnel.leaves?.map((leave) => (
                <ListItem key={leave.id}>
                  <ListItemText
                    primary={`${leave.type} Leave`}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reason: {leave.reason}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

PersonnelDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personnelId: PropTypes.string.isRequired
}; 