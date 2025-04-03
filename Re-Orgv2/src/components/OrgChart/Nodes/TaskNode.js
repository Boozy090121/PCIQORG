import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  TextField, 
  Box,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Delete as DeleteIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateNode, removeNode } from '../../../features/OrgChart/orgChartSlice';

const TaskNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    label: data.label || '',
    description: data.description || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateNode({
      id,
      data: {
        ...data,
        label: editedData.label,
        description: editedData.description
      }
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeNode(id));
  };

  const handleChange = (field, value) => {
    setEditedData({
      ...editedData,
      [field]: value
    });
  };

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      
      <Card 
        sx={{ 
          width: 200, 
          bgcolor: '#fdfdf0', 
          border: '1px solid #ff9800',
          '&:hover': { boxShadow: 3 }
        }}
        className="drag-handle"
      >
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ color: '#ff9800', mr: 1, fontSize: 20 }} />
              {isEditing ? (
                <TextField
                  value={editedData.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                  size="small"
                  autoFocus
                  sx={{ width: 120 }}
                  placeholder="Task Name"
                />
              ) : (
                <Tooltip title={data.label} arrow placement="top">
                  <Typography variant="subtitle1" sx={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    maxWidth: 120,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {data.label}
                  </Typography>
                </Tooltip>
              )}
            </Box>
            
            <Box>
              {isEditing ? (
                <IconButton size="small" onClick={handleSave}>
                  <SaveIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          {isEditing ? (
            <TextField
              value={editedData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="Task description"
            />
          ) : (
            <Tooltip title={data.description} arrow placement="bottom">
              <Typography variant="body2" color="text.secondary" sx={{
                height: '2.4em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {data.description || 'No description provided'}
              </Typography>
            </Tooltip>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Connect to roles or personnel
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default TaskNode; 