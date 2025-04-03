import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Assignment as TaskIcon,
  Flag as MilestoneIcon,
  Person as PersonIcon,
  Timeline as TimelineIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask, addMilestone, updateMilestone, deleteMilestone } from '../../../features/Implementation/implementationTrackingSlice';

const RightPanel = () => {
  const dispatch = useDispatch();
  const { tasks, milestones } = useSelector((state) => state.implementationTracking);
  const { currentFactory } = useSelector((state) => state.focusFactory);
  const { currentPhase } = useSelector((state) => state.phase);
  const { personnel } = useSelector((state) => state.personnel);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    status: 'pending'
  });

  // Calculate statistics
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedMilestones = milestones.filter(milestone => milestone.status === 'completed').length;
  const totalMilestones = milestones.length;
  const assignedPersonnel = personnel.filter(person => person.assigned).length;

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleAddClick = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      status: 'pending'
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditClick = () => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title,
        description: selectedItem.description || '',
        dueDate: selectedItem.dueDate || '',
        assignedTo: selectedItem.assignedTo || '',
        status: selectedItem.status
      });
      setEditMode(true);
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedItem) {
      if (selectedItem.type === 'task') {
        dispatch(deleteTask(selectedItem.id));
      } else {
        dispatch(deleteMilestone(selectedItem.id));
      }
    }
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      status: 'pending'
    });
  };

  const handleSubmit = () => {
    if (editMode && selectedItem) {
      if (selectedItem.type === 'task') {
        dispatch(updateTask({
          id: selectedItem.id,
          ...formData
        }));
      } else {
        dispatch(updateMilestone({
          id: selectedItem.id,
          ...formData
        }));
      }
    } else {
      if (selectedItem?.type === 'milestone') {
        dispatch(addMilestone({
          id: `milestone-${Date.now()}`,
          ...formData
        }));
      } else {
        dispatch(addTask({
          id: `task-${Date.now()}`,
          ...formData
        }));
      }
    }
    handleDialogClose();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CompletedIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <PendingIcon color="warning" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Paper sx={{ width: 300, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Implementation Status
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Phase: {currentPhase?.name || 'Not selected'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Factory: {currentFactory?.name || 'Not selected'}
        </Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1">Progress Overview</Typography>
          <IconButton onClick={handleAddClick} size="small">
            <AddIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tasks: {completedTasks}/{totalTasks}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(completedTasks / totalTasks) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Milestones: {completedMilestones}/{totalMilestones}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(completedMilestones / totalMilestones) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText
              primary="Tasks"
              secondary={`${completedTasks}/${totalTasks} completed`}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <MilestoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Milestones"
              secondary={`${completedMilestones}/${totalMilestones} achieved`}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Personnel"
              secondary={`${assignedPersonnel}/${personnel.length} assigned`}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText
              primary="Timeline"
              secondary={currentPhase ? `${currentPhase.startDate} - ${currentPhase.endDate}` : 'Not set'}
            />
          </ListItem>
        </List>

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recent Tasks
          </Typography>
          {tasks.slice(0, 5).map((task) => (
            <Box
              key={task.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getStatusIcon(task.status)}
                <Typography variant="body2" noWrap>
                  {task.title}
                </Typography>
              </Box>
              <IconButton size="small" onClick={(e) => handleMenuClick(e, { ...task, type: 'task' })}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upcoming Milestones
          </Typography>
          {milestones.slice(0, 5).map((milestone) => (
            <Box
              key={milestone.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getStatusIcon(milestone.status)}
                <Typography variant="body2" noWrap>
                  {milestone.title}
                </Typography>
              </Box>
              <IconButton size="small" onClick={(e) => handleMenuClick(e, { ...milestone, type: 'milestone' })}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

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
        <DialogTitle>
          {editMode ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </TextField>
            <TextField
              select
              label="Assigned To"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              fullWidth
            >
              {personnel.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </TextField>
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

export default RightPanel; 