import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  MarkerType,
  Panel,
  addEdge,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  WifiTethering as SkillIcon,
  AccountTree as OrgIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  SaveAlt as SaveIcon,
  NavigateBefore as CollapseLeftIcon,
  NavigateNext as CollapseRightIcon,
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

import {
  addNode,
  removeNode,
  updateNode,
  addEdge as addFlowEdge,
  removeEdge
} from '../../features/OrgChart/orgChartSlice';

// Enhanced custom node for roles in the flow
const CustomRoleNode = ({ data, selected }) => {
  return (
    <div style={{ 
      padding: '12px', 
      borderRadius: '8px',
      border: selected ? '2px solid #f50057' : '1px solid #1976d2',
      boxShadow: selected ? '0 0 8px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#e3f2fd',
      width: '220px',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '10px',
        fontWeight: 'bold',
        fontSize: '16px'
      }}>
        <WorkIcon style={{ fontSize: 18, marginRight: 8, color: '#1976d2' }} />
        {data.label}
      </div>

      {data.responsibilities && data.responsibilities.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Responsibilities:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.responsibilities.slice(0, 3).map((resp, index) => (
              <Chip
                key={index}
                label={resp}
                size="small"
                style={{ fontSize: '0.7rem', backgroundColor: '#e8f5e9' }}
              />
            ))}
            {data.responsibilities.length > 3 && (
              <Chip 
                label={`+${data.responsibilities.length - 3}`} 
                size="small" 
                style={{ fontSize: '0.7rem' }}
              />
            )}
          </div>
        </div>
      )}

      {data.personnel && data.personnel.length > 0 && (
        <div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Personnel:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.personnel.slice(0, 3).map(person => (
              <Chip
                key={person.id}
                label={person.name}
                size="small"
                variant="outlined"
                style={{ 
                  margin: '2px', 
                  fontSize: '0.7rem',
                  backgroundColor: '#e0f7fa' 
                }}
                avatar={<PersonIcon style={{ width: '14px', height: '14px' }} />}
              />
            ))}
            {data.personnel.length > 3 && (
              <Chip 
                label={`+${data.personnel.length - 3}`} 
                size="small" 
                style={{ fontSize: '0.7rem' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function OrgChartView() {
  const dispatch = useDispatch();
  const nodes = useSelector(state => state.orgChart.nodes || []);
  const edges = useSelector(state => state.orgChart.edges || []);
  
  // Form state
  const [newRoleName, setNewRoleName] = useState('');
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonTitle, setNewPersonTitle] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  
  // ReactFlow state
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState([]);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState([]);
  
  // Node types registration for ReactFlow
  const nodeTypes = {
    role: CustomRoleNode
  };
  
  // Filter nodes by type
  const roleNodes = nodes.filter(node => node.type === 'role')
    .sort((a, b) => a.data.label.localeCompare(b.data.label));
  
  const personnelNodes = nodes.filter(node => node.type === 'personnel')
    .sort((a, b) => a.data.label.localeCompare(b.data.label));
  
  // Update ReactFlow nodes when redux state changes
  React.useEffect(() => {
    const flowNodes = roleNodes.map((node) => ({
      id: node.id,
      type: 'role',
      position: node.position || { 
        x: 250, 
        y: 100 
      },
      data: node.data,
      draggable: true,
    }));
    
    setRfNodes(flowNodes);
  }, [roleNodes, setRfNodes]);
  
  // Update ReactFlow edges when redux state changes
  React.useEffect(() => {
    setRfEdges(edges.map(edge => ({
      ...edge,
      animated: true,
      style: { stroke: '#1976d2', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#1976d2',
      },
    })));
  }, [edges, setRfEdges]);
  
  // Handle node position changes in the flow
  const onNodeDragStop = useCallback((event, node) => {
    dispatch(updateNode({
      id: node.id,
      position: {
        x: node.position.x,
        y: node.position.y
      }
    }));
  }, [dispatch]);
  
  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);
  
  // Handle background click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);
  
  // Handle edge connections
  const onConnect = useCallback((params) => {
    const newEdge = {
      id: `edge-${uuidv4()}`,
      source: params.source,
      target: params.target
    };
    dispatch(addFlowEdge(newEdge));
  }, [dispatch]);
  
  // Role management functions
  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    
    const newRoleId = `role-${uuidv4()}`;
    const newNode = {
      id: newRoleId,
      type: 'role',
      data: {
        label: newRoleName,
        responsibilities: [],
        personnel: []
      },
      position: { 
        x: 100 + (roleNodes.length % 3) * 250, 
        y: 100 + Math.floor(roleNodes.length / 3) * 150 
      }
    };
    
    dispatch(addNode(newNode));
    setNewRoleName('');
  };
  
  // Personnel management functions
  const handleAddPersonnel = () => {
    if (!newPersonName.trim()) return;
    
    const newPersonnelId = `personnel-${uuidv4()}`;
    const newNode = {
      id: newPersonnelId,
      type: 'personnel',
      data: {
        label: newPersonName,
        title: newPersonTitle || '',
        skills: []
      }
    };
    
    dispatch(addNode(newNode));
    setNewPersonName('');
    setNewPersonTitle('');
  };
  
  const handleDeleteNode = (nodeId) => {
    dispatch(removeNode(nodeId));
  };
  
  // Create a drop handler for dragging personnel onto role nodes
  const onDrop = useCallback((event) => {
    if (!reactFlowInstance) return;
    
    event.preventDefault();
    
    const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    
    // Get the dropped data
    const personnelId = event.dataTransfer.getData('application/personnelId');
    if (!personnelId) return;
    
    // Find the role node at the drop position
    const targetRoleNode = rfNodes.find(node => {
      const nodeLeft = node.position.x;
      const nodeRight = node.position.x + 220; // node width
      const nodeTop = node.position.y;
      const nodeBottom = node.position.y + 150; // approximate node height
      
      return (
        position.x >= nodeLeft && 
        position.x <= nodeRight && 
        position.y >= nodeTop && 
        position.y <= nodeBottom
      );
    });
    
    if (targetRoleNode) {
      const roleNode = nodes.find(n => n.id === targetRoleNode.id);
      const personnelNode = nodes.find(n => n.id === personnelId);
      
      if (roleNode && personnelNode) {
        const existingPersonnel = roleNode.data.personnel || [];
        const alreadyAssigned = existingPersonnel.some(p => p.id === personnelId);
        
        if (!alreadyAssigned) {
          dispatch(updateNode({
            id: roleNode.id,
            data: {
              ...roleNode.data,
              personnel: [
                ...existingPersonnel,
                {
                  id: personnelId,
                  name: personnelNode.data.label,
                  title: personnelNode.data.title || ''
                }
              ]
            }
          }));
        }
      }
    }
  }, [reactFlowInstance, rfNodes, nodes, dispatch]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" display="flex" alignItems="center">
          <OrgIcon sx={{ mr: 1 }} /> Organization Chart
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Save Organization Chart">
            <IconButton size="small" color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      
      <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {/* Left Panel - Roles */}
        <Grid item xs={3} sx={{ height: '100%', borderRight: '1px solid #e0e0e0', p: 2, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ mr: 1, fontSize: 20 }} /> Roles
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              label="New Role Name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddRole}
              disabled={!newRoleName.trim()}
              fullWidth
            >
              Add Role
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {roleNodes.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              No roles defined yet
            </Typography>
          ) : (
            <List sx={{ px: 0 }}>
              {roleNodes.map(role => (
                <Card key={role.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    title={
                      <Typography variant="subtitle2">{role.data.label}</Typography>
                    }
                    avatar={<WorkIcon color="primary" fontSize="small" />}
                    action={
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteNode(role.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{ py: 1, px: 1 }}
                  />
                </Card>
              ))}
            </List>
          )}
        </Grid>
        
        {/* Center Panel - Flow */}
        <Grid item xs={6} sx={{ height: '100%', position: 'relative' }}>
          <Paper sx={{ height: '100%', position: 'relative', '& .react-flow': { borderRadius: 1 } }}>
            <ReactFlow
              nodes={rfNodes}
              edges={rfEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeDragStop={onNodeDragStop}
              onInit={setReactFlowInstance}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              connectionLineType={ConnectionLineType.SmoothStep}
              onDrop={onDrop}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
              }}
              fitView
            >
              <Background color="#f5f5f5" gap={16} variant="dots" />
              <Controls showInteractive={false} />
              <Panel position="top-right">
                <Card variant="outlined" sx={{ p: 1, mb: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <Typography variant="caption">
                    Drag personnel from the right panel onto roles to assign them
                  </Typography>
                </Card>
              </Panel>
              <Panel position="bottom-center">
                <Card variant="outlined" sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <Typography variant="body2">
                    {selectedNode ? `Selected: ${selectedNode.data.label}` : 'Click on a role to select it'}
                  </Typography>
                </Card>
              </Panel>
            </ReactFlow>
          </Paper>
        </Grid>
        
        {/* Right Panel - Personnel */}
        <Grid item xs={3} sx={{ height: '100%', borderLeft: '1px solid #e0e0e0', p: 2, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1, fontSize: 20 }} /> Personnel
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              label="New Personnel Name"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              size="small"
              label="Title (Optional)"
              value={newPersonTitle}
              onChange={(e) => setNewPersonTitle(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button 
              variant="contained" 
              color="secondary"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddPersonnel}
              disabled={!newPersonName.trim()}
              fullWidth
            >
              Add Personnel
            </Button>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {personnelNodes.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              No personnel defined yet
            </Typography>
          ) : (
            <List sx={{ px: 0 }}>
              {personnelNodes.map(person => (
                <Card 
                  key={person.id} 
                  variant="outlined" 
                  sx={{ 
                    mb: 2,
                    cursor: 'grab',
                    '&:hover': { bgcolor: '#f8f8f8' } 
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/personnelId', person.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="subtitle2">{person.data.label}</Typography>
                    }
                    subheader={
                      person.data.title ? (
                        <Typography variant="caption">{person.data.title}</Typography>
                      ) : null
                    }
                    avatar={<PersonIcon color="secondary" fontSize="small" />}
                    action={
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteNode(person.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{ py: 1, px: 1 }}
                  />
                </Card>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrgChartView; 