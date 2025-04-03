import React, { useCallback } from 'react';
import { Paper, Box, Typography, IconButton, Tooltip } from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  FitScreen as FitScreenIcon
} from '@mui/icons-material';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

const CenterPanel = () => {
  const theme = useTheme();
  const { nodes: orgNodes, edges: orgEdges, selectedNode } = useSelector((state) => state.orgChart);
  const { currentFactory } = useSelector((state) => state.focusFactory);
  const [nodes, setNodes, onNodesChange] = useNodesState(orgNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(orgEdges);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleFitView = useCallback(() => {
    fitView({ duration: 800 });
  }, [fitView]);

  return (
    <Paper sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Organization Chart
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {currentFactory?.name || 'No factory selected'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Fit View">
            <IconButton onClick={handleFitView} size="small">
              <FitScreenIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-left"
          style={{ background: theme.palette.background.default }}
        >
          <Background color={theme.palette.divider} gap={16} size={1} />
          <Controls />
          <MiniMap
            nodeColor={theme.palette.primary.main}
            maskColor={theme.palette.background.paper}
            style={{ background: theme.palette.background.paper }}
          />
        </ReactFlow>
      </Box>
    </Paper>
  );
};

export default CenterPanel; 