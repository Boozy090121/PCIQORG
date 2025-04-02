import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  AccountTree as TreeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  DragIndicator as DragIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { selectRoles } from '../../features/Organization/roleSlice';
import { selectPositions, updatePosition } from '../../features/Organization/positionSlice';
import RoleDialog from './RoleDialog';
import PositionDialog from './PositionDialog';

const OrgChart = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const positions = useSelector(selectPositions);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openPositionDialog, setOpenPositionDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // If dropping a role onto a position
    if (source.droppableId === 'roles' && destination.droppableId === 'positions') {
      const role = roles.find(r => r.id === draggableId);
      const position = positions[destination.index];

      dispatch(updatePosition({
        ...position,
        roleId: role.id
      }));
    }
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setOpenRoleDialog(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenRoleDialog(true);
  };

  const handleAddPosition = () => {
    setSelectedPosition(null);
    setOpenPositionDialog(true);
  };

  const handleEditPosition = (position) => {
    setSelectedPosition(position);
    setOpenPositionDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Organization Chart</Typography>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {/* Roles Panel */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Roles
                </Typography>
                <Tooltip title="Add Role">
                  <IconButton onClick={handleAddRole}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Droppable droppableId="roles">
                {(provided) => (
                  <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {roles.map((role, index) => (
                      <Draggable
                        key={role.id}
                        draggableId={role.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
                              mb: 1,
                              bgcolor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}
                          >
                            <ListItemIcon {...provided.dragHandleProps}>
                              <DragIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={role.title}
                              secondary={`Required Skills: ${role.requiredSkills.join(', ')}`}
                            />
                            <IconButton onClick={() => handleEditRole(role)}>
                              <EditIcon />
                            </IconButton>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Paper>
          </Grid>

          {/* Organization Structure */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <TreeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Organization Structure
                </Typography>
                <Tooltip title="Add Position">
                  <IconButton onClick={handleAddPosition}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Droppable droppableId="positions">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ minHeight: 400 }}
                  >
                    {positions.map((position, index) => (
                      <Draggable
                        key={position.id}
                        draggableId={position.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
                              p: 2,
                              mb: 2,
                              bgcolor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box {...provided.dragHandleProps} sx={{ mr: 1 }}>
                                <DragIcon />
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1">{position.title}</Typography>
                                {position.roleId && (
                                  <Typography variant="body2" color="text.secondary">
                                    Role: {roles.find(r => r.id === position.roleId)?.title || 'Unknown'}
                                  </Typography>
                                )}
                              </Box>
                              <IconButton onClick={() => handleEditPosition(position)}>
                                <EditIcon />
                              </IconButton>
                            </Box>
                            {position.reports && position.reports.length > 0 && (
                              <Box sx={{ mt: 2, pl: 4, borderLeft: '1px dashed', borderColor: 'divider' }}>
                                {position.reports.map(reportId => {
                                  const reportPosition = positions.find(p => p.id === reportId);
                                  return reportPosition ? (
                                    <Typography key={reportId} variant="body2" color="text.secondary">
                                      Reports: {reportPosition.title}
                                    </Typography>
                                  ) : null;
                                })}
                              </Box>
                            )}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>

      {/* Dialogs */}
      <RoleDialog
        open={openRoleDialog}
        onClose={() => setOpenRoleDialog(false)}
        role={selectedRole}
      />
      <PositionDialog
        open={openPositionDialog}
        onClose={() => setOpenPositionDialog(false)}
        position={selectedPosition}
      />
    </Box>
  );
};

export default OrgChart; 