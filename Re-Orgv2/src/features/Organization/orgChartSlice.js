import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  loading: false,
  error: null,
  selectedNode: null
};

export const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    setOrgChart: (state, action) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex(node => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(edge => 
        edge.from !== action.payload && edge.to !== action.payload
      );
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    deleteEdge: (state, action) => {
      state.edges = state.edges.filter(edge => 
        edge.from !== action.payload.from || edge.to !== action.payload.to
      );
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setOrgChart,
  addNode,
  updateNode,
  deleteNode,
  addEdge,
  deleteEdge,
  setSelectedNode,
  setLoading,
  setError
} = orgChartSlice.actions;

// Selectors
export const selectOrgChartNodes = state => state.orgChart.nodes;
export const selectOrgChartEdges = state => state.orgChart.edges;
export const selectNodeById = (state, nodeId) => 
  state.orgChart.nodes.find(node => node.id === nodeId);
export const selectChildNodes = (state, parentId) => 
  state.orgChart.nodes.filter(node => node.parentId === parentId);
export const selectNodesByFactory = (state, factoryId) =>
  state.orgChart.nodes.filter(node => node.factoryId === factoryId);
export const selectOrgChartLoading = state => state.orgChart.loading;
export const selectOrgChartError = state => state.orgChart.error;

export default orgChartSlice.reducer; 