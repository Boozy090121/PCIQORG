import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    // Sample roles
    {
      id: 'role-1',
      type: 'role',
      data: {
        label: 'CEO',
        responsibilities: ['Strategic Planning', 'Executive Leadership', 'Corporate Vision'],
        personnel: []
      },
      position: { x: 250, y: 50 }
    },
    {
      id: 'role-2',
      type: 'role',
      data: {
        label: 'HR Director',
        responsibilities: ['Recruitment', 'Employee Relations', 'Training & Development'],
        personnel: []
      },
      position: { x: 100, y: 200 }
    },
    {
      id: 'role-3',
      type: 'role',
      data: {
        label: 'IT Manager',
        responsibilities: ['IT Infrastructure', 'Technical Support', 'Systems Administration'],
        personnel: []
      },
      position: { x: 400, y: 200 }
    },
    
    // Sample personnel
    {
      id: 'personnel-1',
      type: 'personnel',
      data: {
        label: 'John Smith',
        title: 'Chief Executive Officer',
        skills: ['Leadership', 'Strategy', 'Business Development']
      }
    },
    {
      id: 'personnel-2',
      type: 'personnel',
      data: {
        label: 'Jane Doe',
        title: 'Human Resources Director',
        skills: ['Recruiting', 'Policy Development', 'Employee Relations']
      }
    },
    {
      id: 'personnel-3',
      type: 'personnel',
      data: {
        label: 'Mike Johnson',
        title: 'IT Manager',
        skills: ['Network Management', 'Cybersecurity', 'Cloud Computing']
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
  selectedNode: null,
  loading: false,
  error: null,
  viewMode: 'chart'
};

export const orgChartSlice = createSlice({
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
    },
    
    updateNode: (state, action) => {
      const { id, data, position } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);
      
      if (nodeIndex !== -1) {
        const node = state.nodes[nodeIndex];
        if (data) {
          state.nodes[nodeIndex] = {
            ...node,
            data: {
              ...node.data,
              ...data
            }
          };
        }
        if (position) {
          state.nodes[nodeIndex] = {
            ...node,
            position
          };
        }
      }
    },
    
    removeNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter(node => node.id !== nodeId);
      state.edges = state.edges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      );
      if (state.selectedNode?.id === nodeId) {
        state.selectedNode = null;
      }
    },
    
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    
    removeEdge: (state, action) => {
      const edgeId = action.payload;
      state.edges = state.edges.filter(edge => edge.id !== edgeId);
    },
    
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    
    clearSelectedNode: (state) => {
      state.selectedNode = null;
    },
    
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Add a responsibility to a role
    addResponsibility: (state, action) => {
      const { nodeId, responsibility } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === nodeId && node.type === 'role');
      
      if (nodeIndex !== -1) {
        if (!state.nodes[nodeIndex].data.responsibilities) {
          state.nodes[nodeIndex].data.responsibilities = [];
        }
        state.nodes[nodeIndex].data.responsibilities.push(responsibility);
      }
    },
    
    // Remove a responsibility from a role
    removeResponsibility: (state, action) => {
      const { nodeId, index } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === nodeId && node.type === 'role');
      
      if (nodeIndex !== -1 && state.nodes[nodeIndex].data.responsibilities) {
        state.nodes[nodeIndex].data.responsibilities.splice(index, 1);
      }
    },
    
    // Add a skill to personnel
    addSkill: (state, action) => {
      const { nodeId, skill } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === nodeId && node.type === 'personnel');
      
      if (nodeIndex !== -1) {
        if (!state.nodes[nodeIndex].data.skills) {
          state.nodes[nodeIndex].data.skills = [];
        }
        state.nodes[nodeIndex].data.skills.push(skill);
      }
    },
    
    // Remove a skill from personnel
    removeSkill: (state, action) => {
      const { nodeId, index } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === nodeId && node.type === 'personnel');
      
      if (nodeIndex !== -1 && state.nodes[nodeIndex].data.skills) {
        state.nodes[nodeIndex].data.skills.splice(index, 1);
      }
    },
  },
});

export const { 
  setNodes, 
  setEdges, 
  addNode, 
  updateNode, 
  removeNode, 
  addEdge, 
  removeEdge,
  setSelectedNode,
  clearSelectedNode,
  setViewMode,
  addResponsibility,
  removeResponsibility,
  addSkill,
  removeSkill,
  setLoading,
  setError,
  clearError
} = orgChartSlice.actions;

export default orgChartSlice.reducer; 