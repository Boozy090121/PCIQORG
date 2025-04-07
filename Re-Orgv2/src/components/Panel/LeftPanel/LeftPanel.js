import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { addNode, updateNode, removeNode } from '../../../features/OrgChart/orgChartSlice';

const LeftPanel = () => {
  const dispatch = useDispatch();
  const { nodes } = useSelector((state) => state.orgChart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'person',
    role: '',
    department: ''
  });

  const handleMenuClick = (event, node) => {
    setAnchorEl(event.currentTarget);
    setSelectedNode(node);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNode(null);
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      type: 'person',
      role: '',
      department: ''
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditClick = () => {
    if (selectedNode) {
      setFormData({
        name: selectedNode.data.name,
        type: selectedNode.type,
        role: selectedNode.data.role || '',
        department: selectedNode.data.department || ''
      });
      setEditMode(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedNode) {
      dispatch(removeNode(selectedNode.id));
    }
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      type: 'person',
      role: '',
      department: ''
    });
  };

  const handleSubmit = () => {
    if (editMode && selectedNode) {
      dispatch(updateNode({
        id: selectedNode.id,
        data: {
          ...selectedNode.data,
          ...formData
        }
      }));
    } else {
      dispatch(addNode({
        id: `node-${Date.now()}`,
        type: formData.type,
        position: { x: 0, y: 0 },
        data: formData
      }));
    }
    handleDialogClose();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(nodes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update node positions based on new order
    items.forEach((node, index) => {
      dispatch(updateNode({
        id: node.id,
        position: { x: index * 200, y: 0 }
      }));
    });
  };

  return (
    <Paper sx={{ width: 300, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Organization Structure</Typography>
        <IconButton onClick={handleAddClick} size="small">
          <AddIcon />
        </IconButton>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="organization-list">
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ flexGrow: 1, overflow: 'auto' }}
            >
              {nodes.map((node, index) => (
                <Draggable key={node.id} draggableId={node.id} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      secondaryAction={
                        <IconButton edge="end" onClick={(e) => handleMenuClick(e, node)}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        {node.type === 'person' ? <PersonIcon /> :
                         node.type === 'group' ? <GroupIcon /> :
                         <BusinessIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={node.data.name}
                        secondary={node.data.role || node.data.department}
                      />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editMode ? 'Edit Node' : 'Add New Node'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              fullWidth
            >
              <MenuItem value="person">Person</MenuItem>
              <MenuItem value="group">Group</MenuItem>
              <MenuItem value="department">Department</MenuItem>
            </TextField>
            {formData.type === 'person' && (
              <TextField
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                fullWidth
              />
            )}
            {(formData.type === 'group' || formData.type === 'department') && (
              <TextField
                label="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                fullWidth
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LeftPanel; 