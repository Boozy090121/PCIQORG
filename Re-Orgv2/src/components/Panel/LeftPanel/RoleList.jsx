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
import { selectRolesByFactory } from '../../../features/Organization/roleSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { deleteRole } from '../../../features/Organization/roleSlice';
import { RoleCreator } from './RoleCreator';
import { RoleDetails } from './RoleDetails';

/**
 * RoleList component for displaying and managing roles
 * @returns {JSX.Element} RoleList component
 */
export const RoleList = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const roles = useSelector(state => selectRolesByFactory(state, currentFactory));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRole) {
      dispatch(deleteRole(selectedRole.id));
      setIsDeleting(false);
      setSelectedRole(null);
    }
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedRole(null);
  };

  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentFactory) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please select a factory to view roles
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Roles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add Role
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Roles"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredRoles.map((role) => (
          <ListItem
            key={role.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={role.title}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Department: {role.department}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {role.skills?.map((skill) => (
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
                onClick={() => handleEditClick(role)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDeleteClick(role)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <RoleCreator
        open={isCreating}
        onClose={() => setIsCreating(false)}
      />

      {selectedRole && (
        <RoleDetails
          open={isDetailsOpen}
          onClose={handleDetailsClose}
          roleId={selectedRole.id}
        />
      )}

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      >
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedRole?.title}? This action cannot be undone.
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

RoleList.propTypes = {
  searchTerm: PropTypes.string
}; 