import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  milestones: [],
  loading: false,
  error: null
};

const implementationTrackingSlice = createSlice({
  name: 'implementationTracking',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setMilestones: (state, action) => {
      state.milestones = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    addMilestone: (state, action) => {
      state.milestones.push(action.payload);
    },
    updateMilestone: (state, action) => {
      const { id, ...updates } = action.payload;
      const milestone = state.milestones.find(m => m.id === id);
      if (milestone) {
        Object.assign(milestone, updates);
      }
    },
    deleteMilestone: (state, action) => {
      state.milestones = state.milestones.filter(milestone => milestone.id !== action.payload);
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
  setTasks,
  setMilestones,
  addTask,
  updateTask,
  deleteTask,
  addMilestone,
  updateMilestone,
  deleteMilestone,
  setLoading,
  setError,
  clearError
} = implementationTrackingSlice.actions;

export default implementationTrackingSlice.reducer; 