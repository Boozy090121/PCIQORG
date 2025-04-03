import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  TextField, 
  Box,
  Avatar,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Delete as DeleteIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode, removeNode } from '../../../features/OrgChart/orgChartSlice';

const PersonnelNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: data.label || '',
    title: data.title || '',
    newSkill: ''
  });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [assignedRoles, setAssignedRoles] = useState([]);

  // Get edges and nodes to find roles assigned to this personnel
  const edges = useSelector(state => state.orgChart.edges);
  const nodes = useSelector(state => state.orgChart.nodes);

  // Get roles assigned to this personnel
  useEffect(() => {
    // Find all connections to/from this personnel node
    const connectedEdges = edges.filter(
      edge => edge.source === id || edge.target === id
    );

    // Get the role node IDs connected to this personnel
    const roleIds = connectedEdges.map(edge => {
      if (edge.source === id) return edge.target;
      return edge.source;
    });

    // Get the actual role nodes
    const connectedRoles = nodes
      .filter(node => roleIds.includes(node.id) && node.type === 'role')
      .map(node => ({
        id: node.id,
        name: node.data.label
      }));

    setAssignedRoles(connectedRoles);
  }, [id, edges, nodes]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateNode({
      id,
      data: {
        ...data,
        label: editedData.name,
        title: editedData.title
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

  const handleAddSkill = () => {
    if (editedData.newSkill.trim() === '') return;
    
    const updatedSkills = [...(data.skills || []), editedData.newSkill];
    dispatch(updateNode({
      id,
      data: {
        ...data,
        skills: updatedSkills
      }
    }));
    
    setEditedData({
      ...editedData,
      newSkill: ''
    });
    setShowAddSkill(false);
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = (data.skills || []).filter(s => s !== skill);
    dispatch(updateNode({
      id,
      data: {
        ...data,
        skills: updatedSkills
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
          width: 240, 
          bgcolor: '#f9f9f9', 
          border: '1px solid #9c27b0',
          '&:hover': { boxShadow: 3 }
        }}
        className="drag-handle"
      >
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#9c27b0' }}>
                <PersonIcon />
              </Avatar>
              {isEditing ? (
                <TextField
                  value={editedData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  size="small"
                  autoFocus
                  sx={{ width: 130 }}
                  placeholder="Name"
                />
              ) : (
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {data.label}
                </Typography>
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
              value={editedData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              size="small"
              fullWidth
              placeholder="Job Title"
              margin="dense"
            />
          ) : (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {data.title || 'No title specified'}
            </Typography>
          )}
          
          {/* Display assigned roles */}
          {assignedRoles.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Assigned to Roles:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                {assignedRoles.map(role => (
                  <Tooltip key={role.id} title={`Assigned to ${role.name}`} arrow>
                    <Chip
                      icon={<WorkIcon fontSize="small" />}
                      label={role.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </>
          )}
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="subtitle2" color="text.secondary">
            Skills:
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {data.skills && data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  onDelete={() => handleRemoveSkill(skill)}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No skills added
              </Typography>
            )}
          </Box>
          
          {showAddSkill ? (
            <Box sx={{ display: 'flex', mt: 1 }}>
              <TextField
                size="small"
                placeholder="New skill"
                value={editedData.newSkill}
                onChange={(e) => handleChange('newSkill', e.target.value)}
                fullWidth
                autoFocus
              />
              <IconButton size="small" onClick={handleAddSkill}>
                <SaveIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Chip 
              icon={<AddIcon />}
              label="Add Skill"
              size="small"
              onClick={() => setShowAddSkill(true)}
              sx={{ mt: 1 }}
            />
          )}

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Drag to assign to a role
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

export default PersonnelNode; 