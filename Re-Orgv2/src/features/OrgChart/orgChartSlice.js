import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  loading: false,
  error: null
};

const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
      // Automatically create edges based on node hierarchy
      if (state.nodes.length > 1) {
        const newNode = action.payload;
        const parentNode = state.nodes[state.nodes.length - 2];
        state.edges.push({
          id: `edge-${parentNode.id}-${newNode.id}`,
          source: parentNode.id,
          target: newNode.id,
          type: 'smoothstep'
        });
      }
    },
    updateNode: (state, action) => {
      const { id, data, position } = action.payload;
      const node = state.nodes.find(n => n.id === id);
      if (node) {
        if (data) node.data = { ...node.data, ...data };
        if (position) node.position = position;
      }
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter(node => node.id !== nodeId);
      state.edges = state.edges.filter(edge => 
        edge.source !== nodeId && edge.target !== nodeId
      );
      if (state.selectedNode?.id === nodeId) {
        state.selectedNode = null;
      }
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  deleteNode,
  setSelectedNode,
  setLoading,
  setError,
  clearError
} = orgChartSlice.actions;

export default orgChartSlice.reducer; 