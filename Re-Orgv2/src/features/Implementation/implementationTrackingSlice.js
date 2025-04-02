import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  implementations: [],
  loading: false,
  error: null,
  selectedImplementation: null
};

const implementationTrackingSlice = createSlice({
  name: 'implementationTracking',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setImplementations: (state, action) => {
      state.implementations = action.payload;
    },
    setSelectedImplementation: (state, action) => {
      state.selectedImplementation = action.payload;
    },
    addImplementation: (state, action) => {
      state.implementations.push(action.payload);
    },
    updateImplementation: (state, action) => {
      const index = state.implementations.findIndex(imp => imp.id === action.payload.id);
      if (index !== -1) {
        state.implementations[index] = action.payload;
      }
    },
    deleteImplementation: (state, action) => {
      state.implementations = state.implementations.filter(imp => imp.id !== action.payload);
    },
    updateImplementationProgress: (state, action) => {
      const { id, progress } = action.payload;
      const implementation = state.implementations.find(imp => imp.id === id);
      if (implementation) {
        implementation.progress = progress;
      }
    },
    addMilestone: (state, action) => {
      const { implementationId, milestone } = action.payload;
      const implementation = state.implementations.find(imp => imp.id === implementationId);
      if (implementation) {
        if (!implementation.milestones) {
          implementation.milestones = [];
        }
        implementation.milestones.push(milestone);
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setImplementations,
  setSelectedImplementation,
  addImplementation,
  updateImplementation,
  deleteImplementation,
  updateImplementationProgress,
  addMilestone
} = implementationTrackingSlice.actions;

// Selectors with null checks
export const selectImplementationsByFactory = (state, factory) => {
  const implementations = state?.implementationTracking?.implementations;
  return implementations ? implementations.filter(imp => imp.factory === factory) : [];
};

export const selectImplementationById = (state, id) => {
  const implementations = state?.implementationTracking?.implementations;
  return implementations ? implementations.find(imp => imp.id === id) : null;
};

export const selectImplementationLoading = state => state?.implementationTracking?.loading || false;
export const selectImplementationError = state => state?.implementationTracking?.error || null;
export const selectSelectedImplementation = state => state?.implementationTracking?.selectedImplementation || null;

export default implementationTrackingSlice.reducer; 