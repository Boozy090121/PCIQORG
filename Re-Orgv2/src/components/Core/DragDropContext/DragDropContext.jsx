import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updatePersonnel } from '../../../features/Organization/personnelSlice';

const DragDropContextValue = createContext();

/**
 * DragDropProvider component that provides drag and drop context to its children
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} DragDropProvider component
 */
export const DragDropProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  const handleDragStart = (e) => {
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      setDraggedItem(data);
    } catch (error) {
      console.error('Error handling drag start:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'PERSONNEL' || data.type === 'ROLE') {
        setDropTarget(data);
      }
    } catch (error) {
      console.error('Error handling drag over:', error);
    }
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      console.log('Item dropped:', data);
      if (draggedItem?.type === 'PERSONNEL' && dropTarget) {
        // Update personnel's current role
        dispatch(updatePersonnel({
          id: draggedItem.id,
          changes: {
            currentRole: dropTarget
          }
        }));
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    } finally {
      setDraggedItem(null);
      setDropTarget(null);
    }
  };

  return (
    <DragDropContextValue.Provider
      value={{
        draggedItem,
        dropTarget,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop
      }}
    >
      <Box
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{ height: '100%' }}
      >
        {children}
      </Box>
    </DragDropContextValue.Provider>
  );
};

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Custom hook to use the drag and drop context
 * @returns {Object} Drag and drop context value
 */
export const useDragDrop = () => {
  const context = useContext(DragDropContextValue);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};

/**
 * DragDropContext component that wraps its children with drag and drop functionality
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} DragDropContext component
 */
export const DragDropContext = ({ children }) => {
  return <DragDropProvider>{children}</DragDropProvider>;
};

DragDropContext.propTypes = {
  children: PropTypes.node.isRequired
}; 