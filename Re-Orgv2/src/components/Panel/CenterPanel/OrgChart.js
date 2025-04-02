import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { OrgNode } from './OrgNode';
import { handleCanvasDrop } from './utils/dragDropHandlers';

export const OrgChart = ({ factory, phase }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  
  const nodes = useSelector(state => state.orgChart.nodes);
  const factoryData = useSelector(state => state.orgChart.factories[factory]);
  const phaseData = useSelector(state => state.orgChart.phases[phase]);
  const visualSettings = useSelector(state => state.orgChart.visualSettings);

  const { nodeWidth, nodeHeight, spacing } = visualSettings;

  // Filter nodes for current factory and phase
  const factoryNodes = factoryData?.nodes || [];
  const phaseNodes = phaseData?.nodes || [];
  const currentNodes = factoryNodes
    .filter(nodeId => phaseNodes.includes(nodeId))
    .map(nodeId => nodes[nodeId])
    .filter(Boolean);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'auto',
        bgcolor: 'background.default',
        p: 2
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => handleCanvasDrop(e, containerRef, dispatch, factory, phase)}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, ${nodeWidth}px)`,
          gap: spacing,
          justifyContent: 'center',
          padding: spacing
        }}
      >
        {currentNodes.map((node, index) => (
          <OrgNode
            key={node.id}
            node={node}
            index={index}
            factory={factory}
            phase={phase}
            visualSettings={visualSettings}
          />
        ))}
      </Box>
    </Box>
  );
}; 