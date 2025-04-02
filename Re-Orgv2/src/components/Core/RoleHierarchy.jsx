import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { selectRolesByFactory, selectChildRoles, selectRoleHierarchy } from '../../features/Organization/factorySlice';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { updateRoleHierarchy } from '../../features/Organization/roleSlice';
import { RoleCreator } from '../Panel/LeftPanel/RoleCreator';
import { RoleEditor } from '../Panel/LeftPanel/RoleEditor';
import { RoleDetails } from '../Panel/LeftPanel/RoleDetails';

/**
 * RoleNode component for displaying a single role in the hierarchy
 * @param {Object} props - Component props
 * @param {Object} props.role - The role to display
 * @param {Function} props.onEdit - Function to call when edit is clicked
 * @param {Function} props.onDelete - Function to call when delete is clicked
 * @returns {JSX.Element} RoleNode component
 */
const RoleNode = ({ role, onEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
          type: 'ROLE',
          id: role.id,
          data: role
        }));
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          const data = JSON.parse(e.dataTransfer.getData('application/json'));
          if (data.type === 'ROLE') {
            // Handle role drop
            console.log('Role dropped on role:', data.id, role.id);
          }
        } catch (error) {
          console.error('Error handling drop:', error);
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DragIndicatorIcon sx={{ color: 'text.secondary' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">
            {role.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role.department}
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => onEdit(role)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(role)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {role.skills?.map((skill) => (
          <Chip key={skill} label={skill} size="small" />
        ))}
      </Box>
    </Paper>
  );
};

RoleNode.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

/**
 * RoleHierarchy component for displaying and managing role hierarchy
 * @returns {JSX.Element} RoleHierarchy component
 */
export const RoleHierarchy = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const roles = useSelector(state => selectRolesByFactory(state, currentFactory));
  const [selectedRole, setSelectedRole] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [roleToMove, setRoleToMove] = useState(null);
  const [newParentId, setNewParentId] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setIsEditing(true);
  };

  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setIsDeleting(true);
  };

  const handleMoveClick = (role) => {
    setRoleToMove(role);
    setIsMoving(true);
  };

  const handleMoveConfirm = () => {
    if (roleToMove && newParentId) {
      dispatch(updateRoleHierarchy({
        roleId: roleToMove.id,
        parentId: newParentId || null,
        position: roles.length
      }));
      setIsMoving(false);
      setRoleToMove(null);
      setNewParentId('');
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedRole(null);
  };

  const renderRoleTree = (role, level = 0) => {
    const childRoles = useSelector(state => selectChildRoles(state, role.id));
    const hierarchy = useSelector(state => selectRoleHierarchy(state, role.id));

    return (
      <Box key={role.id} sx={{ ml: level * 4 }}>
        <RoleNode
          role={role}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
        {childRoles.map(childRole => renderRoleTree(childRole, level + 1))}
      </Box>
    );
  };

  const rootRoles = roles.filter(role => !role.parentId);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Role Hierarchy
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => {
            setSelectedRole(null);
            setDetailsOpen(true);
          }}
        >
          Add Role
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rootRoles.map(role => renderRoleTree(role))}
      </Box>

      <RoleCreator
        open={isCreating}
        onClose={() => setIsCreating(false)}
      />

      {selectedRole && (
        <RoleEditor
          open={isEditing}
          onClose={() => setIsEditing(false)}
          role={selectedRole}
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
            onClick={() => {
              dispatch(deleteRole(selectedRole.id));
              setIsDeleting(false);
              setSelectedRole(null);
            }} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isMoving}
        onClose={() => setIsMoving(false)}
      >
        <DialogTitle>Move Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>New Parent Role</InputLabel>
            <Select
              value={newParentId}
              onChange={(e) => setNewParentId(e.target.value)}
              label="New Parent Role"
            >
              <MenuItem value="">No Parent (Root Level)</MenuItem>
              {roles
                .filter(role => role.id !== roleToMove?.id)
                .map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMoving(false)}>Cancel</Button>
          <Button 
            onClick={handleMoveConfirm} 
            variant="contained"
          >
            Move
          </Button>
        </DialogActions>
      </Dialog>

      {selectedRole && (
        <RoleDetails
          open={detailsOpen}
          onClose={handleCloseDetails}
          roleId={selectedRole.id}
        />
      )}
    </Box>
  );
}; 