import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { selectPersonnelByFactory } from '../../../features/Organization/personnelSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { deletePersonnel } from '../../../features/Organization/personnelSlice';
import { PersonnelCreator } from './PersonnelCreator';
import { PersonnelDetails } from './PersonnelDetails';

/**
 * PersonnelList component for displaying and managing personnel
 * @returns {JSX.Element} PersonnelList component
 */
export const PersonnelList = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const personnel = useSelector(state => selectPersonnelByFactory(state, currentFactory));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEditClick = (person) => {
    setSelectedPerson(person);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (person) => {
    setSelectedPerson(person);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPerson) {
      dispatch(deletePersonnel(selectedPerson.id));
      setIsDeleting(false);
      setSelectedPerson(null);
    }
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedPerson(null);
  };

  const filteredPersonnel = personnel.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.currentRole?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentFactory) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please select a factory to view personnel
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Personnel</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add Personnel
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Personnel"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredPersonnel.map((person) => (
          <ListItem
            key={person.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={person.name}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {person.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {person.currentRole}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {person.skills?.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleEditClick(person)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDeleteClick(person)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <PersonnelCreator
        open={isCreating}
        onClose={() => setIsCreating(false)}
      />

      {selectedPerson && (
        <PersonnelDetails
          open={isDetailsOpen}
          onClose={handleDetailsClose}
          personId={selectedPerson.id}
        />
      )}

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      >
        <DialogTitle>Delete Personnel</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedPerson?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PersonnelList.propTypes = {
  searchTerm: PropTypes.string
}; 