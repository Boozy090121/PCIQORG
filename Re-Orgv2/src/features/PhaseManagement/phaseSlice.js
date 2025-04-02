import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phases: [],
  projects: [],
  loading: false,
  error: null,
  selectedPhase: null,
  selectedProject: null
};

export const phaseSlice = createSlice({
  name: 'phase',
  initialState,
  reducers: {
    setPhases: (state, action) => {
      state.phases = action.payload;
    },
    addPhase: (state, action) => {
      state.phases.push(action.payload);
    },
    updatePhase: (state, action) => {
      const index = state.phases.findIndex(phase => phase.id === action.payload.id);
      if (index !== -1) {
        state.phases[index] = action.payload;
      }
    },
    deletePhase: (state, action) => {
      state.phases = state.phases.filter(phase => phase.id !== action.payload);
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    setSelectedPhase: (state, action) => {
      state.selectedPhase = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
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
  setPhases,
  addPhase,
  updatePhase,
  deletePhase,
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setSelectedPhase,
  setSelectedProject,
  setLoading,
  setError
} = phaseSlice.actions;

export default phaseSlice.reducer; 