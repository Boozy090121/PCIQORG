import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    {
      id: 'role-1',
      type: 'role',
      data: {
        label: 'CEO',
        responsibilities: ['Corporate Strategy', 'Executive Leadership'],
        personnel: []
      },
      position: { x: 250, y: 50 }
    },
    {
      id: 'role-2',
      type: 'role',
      data: {
        label: 'HR Director',
        responsibilities: ['Employee Relations', 'Recruitment'],
        personnel: []
      },
      position: { x: 100, y: 200 }
    },
    {
      id: 'role-3',
      type: 'role',
      data: {
        label: 'IT Manager',
        responsibilities: ['Technology Strategy', 'System Maintenance'],
        personnel: []
      },
      position: { x: 400, y: 200 }
    },
    {
      id: 'personnel-1',
      type: 'personnel',
      data: {
        label: 'John Smith',
        title: 'Senior Executive',
        skills: ['Leadership', 'Strategy']
      }
    },
    {
      id: 'personnel-2',
      type: 'personnel',
      data: {
        label: 'Jane Doe',
        title: 'HR Specialist',
        skills: ['Recruitment', 'Training']
      }
    },
    {
      id: 'personnel-3',
      type: 'personnel',
      data: {
        label: 'Mike Johnson',
        title: 'IT Specialist',
        skills: ['Networking', 'Security']
      }
    }
  ],
  edges: [
    {
      id: 'edge-1-2',
      source: 'role-1',
      target: 'role-2'
    },
    {
      id: 'edge-1-3',
      source: 'role-1',
      target: 'role-3'
    }
  ],
  viewMode: 'chart'
};

export const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      );
    },
    updateNode: (state, action) => {
      const { id, ...updates } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);
      
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          ...updates
        };
      }
    },
    addEdge: (state, action) => {
      if (!state.edges.some(edge => 
        edge.source === action.payload.source && 
        edge.target === action.payload.target
      )) {
        state.edges.push(action.payload);
      }
    },
    removeEdge: (state, action) => {
      state.edges = state.edges.filter(edge => edge.id !== action.payload);
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

export const { 
  addNode, 
  removeNode, 
  updateNode, 
  addEdge, 
  removeEdge,
  setViewMode
} = orgChartSlice.actions;

export default orgChartSlice.reducer; 