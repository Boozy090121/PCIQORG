import { createSlice, nanoid } from '@reduxjs/toolkit';

const createEmptyOrgChart = () => ({
  nodes: [],
  connections: []
});

const initialState = {
  orgCharts: {
    current: {
      ADD: createEmptyOrgChart(),
      BBV: createEmptyOrgChart(),
      SYN: createEmptyOrgChart()
    },
    future: {
      ADD: createEmptyOrgChart(),
      BBV: createEmptyOrgChart(),
      SYN: createEmptyOrgChart()
    }
  }
};

export const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { phase, factory, node } = action.payload;
      node.id = nanoid();
      state.orgCharts[phase][factory].nodes.push(node);
    },
    updateNode: (state, action) => {
      const { phase, factory, node } = action.payload;
      const index = state.orgCharts[phase][factory].nodes.findIndex(n => n.id === node.id);
      if (index !== -1) {
        state.orgCharts[phase][factory].nodes[index] = node;
      }
    },
    deleteNode: (state, action) => {
      const { phase, factory, nodeId } = action.payload;
      state.orgCharts[phase][factory].nodes = state.orgCharts[phase][factory].nodes.filter(node => node.id !== nodeId);
      // Also remove any connections that include this node
      state.orgCharts[phase][factory].connections = state.orgCharts[phase][factory].connections.filter(
        conn => conn.sourceId !== nodeId && conn.targetId !== nodeId
      );
    },
    addConnection: (state, action) => {
      const { phase, factory, connection } = action.payload;
      connection.id = nanoid();
      state.orgCharts[phase][factory].connections.push(connection);
    },
    updateConnection: (state, action) => {
      const { phase, factory, connection } = action.payload;
      const index = state.orgCharts[phase][factory].connections.findIndex(c => c.id === connection.id);
      if (index !== -1) {
        state.orgCharts[phase][factory].connections[index] = connection;
      }
    },
    deleteConnection: (state, action) => {
      const { phase, factory, connectionId } = action.payload;
      state.orgCharts[phase][factory].connections = state.orgCharts[phase][factory].connections.filter(
        conn => conn.id !== connectionId
      );
    },
    copyOrgChart: (state, action) => {
      const { sourcePhase, targetPhase, factory } = action.payload;
      state.orgCharts[targetPhase][factory] = JSON.parse(JSON.stringify(state.orgCharts[sourcePhase][factory]));
    }
  }
});

export const {
  addNode,
  updateNode,
  deleteNode,
  addConnection,
  updateConnection,
  deleteConnection,
  copyOrgChart
} = orgChartSlice.actions;

export const selectOrgChart = (state, phase, factory) => state.orgChart.orgCharts[phase][factory];

export default orgChartSlice.reducer; 