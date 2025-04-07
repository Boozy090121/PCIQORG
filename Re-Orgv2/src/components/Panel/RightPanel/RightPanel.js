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

// Simple version with dummy data as a fallback
const RightPanel = () => {
  // Simplified panel that doesn't rely on specific Redux slices
  return (
    <Paper sx={{ width: 300, height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Personnel Management
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Add and manage personnel
        </Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1">Personnel</Typography>
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Drag personnel from this panel onto roles in the org chart to assign them.
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="John Smith"
              secondary="CEO"
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Jane Doe"
              secondary="HR Director"
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Mike Johnson"
              secondary="IT Manager"
            />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Use this panel to manage personnel and assign them to roles in the organization.
        </Typography>
      </Box>
    </Paper>
  );
};

export default RightPanel; 