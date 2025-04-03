import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  TextField, 
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode, removeNode } from '../../../features/OrgChart/orgChartSlice';

const RoleNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const [newResponsibility, setNewResponsibility] = useState('');
  const [showAddResponsibility, setShowAddResponsibility] = useState(false);
  const [assignedPersonnel, setAssignedPersonnel] = useState([]);

  // Get edges and nodes to find personnel assigned to this role
  const edges = useSelector(state => state.orgChart.edges);
  const nodes = useSelector(state => state.orgChart.nodes);

  // Get personnel assigned to this role
  useEffect(() => {
    // Find all connections to/from this role node
    const connectedEdges = edges.filter(
      edge => edge.source === id || edge.target === id
    );

    // Get the personnel node IDs connected to this role
    const personnelIds = connectedEdges.map(edge => {
      if (edge.source === id) return edge.target;
      return edge.source;
    });

    // Get the actual personnel nodes
    const connectedPersonnel = nodes
      .filter(node => personnelIds.includes(node.id) && node.type === 'personnel')
      .map(node => ({
        id: node.id,
        name: node.data.label,
        title: node.data.title
      }));

    setAssignedPersonnel(connectedPersonnel);
  }, [id, edges, nodes]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateNode({
      id,
      data: {
        ...data,
        label: editedLabel
      }
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeNode(id));
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim() === '') return;
    
    const updatedResponsibilities = [...(data.responsibilities || []), newResponsibility];
    dispatch(updateNode({
      id,
      data: {
        ...data,
        responsibilities: updatedResponsibilities
      }
    }));
    
    setNewResponsibility('');
    setShowAddResponsibility(false);
  };

  const handleRemoveResponsibility = (index) => {
    const updatedResponsibilities = [...data.responsibilities];
    updatedResponsibilities.splice(index, 1);
    
    dispatch(updateNode({
      id,
      data: {
        ...data,
        responsibilities: updatedResponsibilities
      }
    }));
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
          width: 220, 
          bgcolor: '#f5f5f5', 
          border: '1px solid #1976d2',
          '&:hover': { boxShadow: 3 } 
        }}
        className="drag-handle"
      >
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            {isEditing ? (
              <TextField
                value={editedLabel}
                onChange={(e) => setEditedLabel(e.target.value)}
                size="small"
                autoFocus
                fullWidth
                sx={{ mr: 1 }}
              />
            ) : (
              <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#1976d2' }}>
                {data.label}
              </Typography>
            )}
            
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
          
          {/* Display assigned personnel */}
          {assignedPersonnel.length > 0 && (
            <>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Assigned Personnel:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                {assignedPersonnel.map(person => (
                  <Chip
                    key={person.id}
                    avatar={<Avatar sx={{ bgcolor: '#9c27b0' }}>{person.name.charAt(0)}</Avatar>}
                    label={person.name}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </Box>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Responsibilities:
          </Typography>
          
          {data.responsibilities && data.responsibilities.length > 0 ? (
            <List dense sx={{ pt: 0, pb: 0 }}>
              {data.responsibilities.map((resp, index) => (
                <ListItem 
                  key={index} 
                  dense 
                  sx={{ px: 1, py: 0.25 }}
                  secondaryAction={
                    <IconButton edge="end" size="small" onClick={() => handleRemoveResponsibility(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={resp} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No responsibilities added
            </Typography>
          )}
          
          {showAddResponsibility ? (
            <Box sx={{ display: 'flex', mt: 1 }}>
              <TextField
                size="small"
                placeholder="New responsibility"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                fullWidth
                autoFocus
              />
              <IconButton size="small" onClick={handleAddResponsibility}>
                <SaveIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Chip 
              icon={<AddIcon />}
              label="Add Responsibility"
              size="small"
              onClick={() => setShowAddResponsibility(true)}
              sx={{ mt: 1 }}
            />
          )}
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

export default RoleNode; 