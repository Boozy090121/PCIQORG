import React from 'react';
import { Box } from '@mui/material';
// Use the global ReactBeautifulDnD from CDN
const { DragDropContext, Droppable } = window.ReactBeautifulDnD;
import { OrgNode } from './OrgNode';

export const OrgChartContent = ({ 
  nodes, 
  connections, 
  zoom, 
  visualSettings = {}, 
  searchTerm = '' 
}) => {
  const handleCanvasDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleCanvasDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const canvas = event.currentTarget;
    canvas.classList.add('drag-over');
  };

  const handleCanvasDragLeave = () => {
    const canvas = document.querySelector('.org-chart-canvas');
    if (canvas) {
      canvas.classList.remove('drag-over');
    }
  };

  const handleCanvasDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleCanvasDragLeave();

    const data = event.dataTransfer.getData('text/plain');
    if (!data) return;

    try {
      const dropData = JSON.parse(data);
      // Handle the drop data here
      console.log('Canvas drop:', dropData);
    } catch (error) {
      console.error('Error parsing drop data:', error);
    }
  };

  const renderConnections = () => {
    if (!visualSettings.showConnections) return null;

    return connections.map((connection, index) => {
      const sourceNode = nodes.find(n => n.id === connection.sourceId);
      const targetNode = nodes.find(n => n.id === connection.targetId);

      if (!sourceNode || !targetNode) return null;

      const sourceX = sourceNode.x + sourceNode.width / 2;
      const sourceY = sourceNode.y + sourceNode.height / 2;
      const targetX = targetNode.x + targetNode.width / 2;
      const targetY = targetNode.y + targetNode.height / 2;

      const path = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

      return (
        <path
          key={index}
          d={path}
          className="connection-line"
          strokeWidth="2"
          fill="none"
        />
      );
    });
  };

  const filteredNodes = nodes.filter(node => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      node.title.toLowerCase().includes(searchLower) ||
      node.role?.name.toLowerCase().includes(searchLower) ||
      node.personnel?.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DragDropContext>
      <Droppable droppableId="org-chart">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="org-chart-canvas"
            sx={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
            onDragOver={handleCanvasDragOver}
            onDragEnter={handleCanvasDragEnter}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
          >
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              {renderConnections()}
            </svg>
            {filteredNodes.map((node, index) => (
              <OrgNode
                key={node.id}
                node={node}
                index={index}
                visualSettings={visualSettings}
                isHighlighted={!!searchTerm}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}; 