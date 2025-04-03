import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    // Sample roles
    {
      id: 'role-1',
      type: 'role',
      data: {
        label: 'CEO',
        responsibilities: ['Strategic Planning', 'Executive Leadership', 'Corporate Vision']
      },
      position: { x: 50, y: 50 }
    },
    {
      id: 'role-2',
      type: 'role',
      data: {
        label: 'HR Director',
        responsibilities: ['Recruitment', 'Employee Relations', 'Training & Development']
      },
      position: { x: 200, y: 50 }
    },
    {
      id: 'role-3',
      type: 'role',
      data: {
        label: 'IT Manager',
        responsibilities: ['IT Infrastructure', 'Technical Support', 'Systems Administration']
      },
      position: { x: 350, y: 50 }
    },
    
    // Sample personnel
    {
      id: 'personnel-1',
      type: 'personnel',
      data: {
        label: 'John Smith',
        title: 'Chief Executive Officer',
        skills: ['Leadership', 'Strategy', 'Business Development']
      },
      position: { x: 50, y: 200 }
    },
    {
      id: 'personnel-2',
      type: 'personnel',
      data: {
        label: 'Jane Doe',
        title: 'Human Resources Director',
        skills: ['Recruiting', 'Policy Development', 'Employee Relations']
      },
      position: { x: 200, y: 200 }
    },
    {
      id: 'personnel-3',
      type: 'personnel',
      data: {
        label: 'Mike Johnson',
        title: 'IT Manager',
        skills: ['Network Management', 'Cybersecurity', 'Cloud Computing']
      },
      position: { x: 350, y: 200 }
    }
  ],
  edges: [
    // Sample connections between personnel and roles
    {
      id: 'edge-personnel-1-role-1',
      source: 'personnel-1',
      target: 'role-1'
    },
    {
      id: 'edge-personnel-2-role-2',
      source: 'personnel-2',
      target: 'role-2'
    },
    {
      id: 'edge-personnel-3-role-3',
      source: 'personnel-3',
      target: 'role-3'
    }
  ],
  selectedNode: null,
  viewMode: 'organization', // 'organization' or 'responsibilities'
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
      const { id, data } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);
      
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          data: {
            ...state.nodes[nodeIndex].data,
            ...data
          }
        };
      }
    },
    
    removeNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter(node => node.id !== nodeId);
      state.edges = state.edges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      );
    },
    
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    
    removeEdge: (state, action) => {
      const { id } = action.payload;
      state.edges = state.edges.filter(edge => edge.id !== id);
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
  removeSkill
} = orgChartSlice.actions;

export default orgChartSlice.reducer; 