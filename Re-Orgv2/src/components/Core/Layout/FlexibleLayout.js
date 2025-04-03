import React from 'react';
import { Box } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const FlexibleLayout = ({ children }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // TODO: Implement panel reordering logic
    console.log('Drag ended:', result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="flexible-layout" direction="horizontal">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: 'flex',
              flexGrow: 1,
              gap: 2,
              minHeight: 0,
              overflow: 'hidden'
            }}
          >
            {children}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FlexibleLayout; 