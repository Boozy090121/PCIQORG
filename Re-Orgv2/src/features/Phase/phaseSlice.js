import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phases: [],
  currentPhase: null,
  loading: false,
  error: null
};

const phaseSlice = createSlice({
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
      const { id, ...updates } = action.payload;
      const phase = state.phases.find(p => p.id === id);
      if (phase) {
        Object.assign(phase, updates);
      }
      if (state.currentPhase?.id === id) {
        state.currentPhase = { ...state.currentPhase, ...updates };
      }
    },
    deletePhase: (state, action) => {
      state.phases = state.phases.filter(phase => phase.id !== action.payload);
      if (state.currentPhase?.id === action.payload) {
        state.currentPhase = null;
      }
    },
    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload;
    },
    updatePhaseProgress: (state, action) => {
      const { id, progress } = action.payload;
      const phase = state.phases.find(p => p.id === id);
      if (phase) {
        phase.progress = progress;
      }
      if (state.currentPhase?.id === id) {
        state.currentPhase.progress = progress;
      }
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
  setPhases,
  addPhase,
  updatePhase,
  deletePhase,
  setCurrentPhase,
  updatePhaseProgress,
  setLoading,
  setError,
  clearError
} = phaseSlice.actions;

export default phaseSlice.reducer; 