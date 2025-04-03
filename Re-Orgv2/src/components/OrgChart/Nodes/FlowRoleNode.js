import React, { useCallback } from 'react';
import { 
  Card, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import { Handle, Position } from 'reactflow';
import { WorkOutlined, PersonOutlined, Delete as DeleteIcon } from '@mui/icons-material';

// Pure component version that doesn't use Redux directly
function FlowRoleNode({ data, id }) {
  // These handlers will be provided by ReactFlow via data.handlers
  const handleRemovePersonnel = useCallback((e, personnelId) => {
    e.stopPropagation();
    // Use the handler passed via data prop instead of direct Redux dispatch
    if (data.handlers && data.handlers.removePersonnel) {
      data.handlers.removePersonnel(id, personnelId);
    }
  }, [data.handlers, id]);
  
  // Handle deleting the role node
  const handleDeleteNode = useCallback((e) => {
    e.stopPropagation();
    // Use the handler passed via data prop instead of direct Redux dispatch
    if (data.handlers && data.handlers.deleteNode) {
      data.handlers.deleteNode(id);
    }
  }, [data.handlers, id]);
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ minWidth: 220, maxWidth: 280 }}>
        <Box sx={{ 
          p: 1, 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkOutlined sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {data.label || 'Role'}
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={handleDeleteNode}
            sx={{ p: 0.5, color: 'inherit' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Divider />
        
        {data.responsibilities && data.responsibilities.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Responsibilities:</Typography>
            <List dense disablePadding>
              {data.responsibilities.slice(0, 3).map((resp, idx) => (
                <ListItem key={idx} dense disablePadding>
                  <ListItemText 
                    primary={<Typography variant="caption">{resp}</Typography>} 
                  />
                </ListItem>
              ))}
              {data.responsibilities.length > 3 && (
                <ListItem dense disablePadding>
                  <ListItemText 
                    primary={
                      <Typography variant="caption" color="text.secondary">
                        +{data.responsibilities.length - 3} more...
                      </Typography>
                    } 
                  />
                </ListItem>
              )}
            </List>
          </Box>
        )}
        
        {/* Personnel assigned to this role */}
        {data.personnel && data.personnel.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 0.5, display: 'block' }}>
                Assigned Personnel:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {data.personnel.map((person) => (
                  <Chip
                    key={person.id}
                    icon={<PersonOutlined fontSize="small" />}
                    label={person.name}
                    size="small"
                    onDelete={(e) => handleRemovePersonnel(e, person.id)}
                    sx={{ height: 24, fontSize: '0.75rem', alignSelf: 'flex-start' }}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(FlowRoleNode); 