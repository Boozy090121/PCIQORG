import { createSlice } from '@reduxjs/toolkit';

// Simple initial state
const initialState = {
  nodes: [],
  viewMode: 'organization'
};

const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
    updateNode: (state, action) => {
      const { id, ...updates } = action.payload;
      
      state.nodes = state.nodes.map(node => {
        if (node.id === id) {
          return { ...node, ...updates };
        }
        return node;
      });
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

export const { addNode, removeNode, updateNode, setViewMode } = orgChartSlice.actions;

export default orgChartSlice.reducer; 