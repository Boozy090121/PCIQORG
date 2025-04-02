import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPhase: 'current',
  phases: ['current', 'future'],
  loading: false,
  error: null
};

export const phaseSlice = createSlice({
  name: 'phase',
  initialState,
  reducers: {
    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload;
      state.error = null;
    },
    copyPhase: (state, action) => {
      const { fromPhase, toPhase } = action.payload;
      if (state.phases.includes(fromPhase) && !state.phases.includes(toPhase)) {
        state.phases.push(toPhase);
        state.error = null;
      } else {
        state.error = 'Invalid phase operation';
      }
    },
    addPhase: (state, action) => {
      const newPhase = action.payload;
      if (!state.phases.includes(newPhase)) {
        state.phases.push(newPhase);
        state.error = null;
      } else {
        state.error = 'Phase already exists';
      }
    },
    removePhase: (state, action) => {
      const phaseToRemove = action.payload;
      if (phaseToRemove !== 'current' && phaseToRemove !== 'future') {
        state.phases = state.phases.filter(phase => phase !== phaseToRemove);
        if (state.currentPhase === phaseToRemove) {
          state.currentPhase = 'current';
        }
        state.error = null;
      } else {
        state.error = 'Cannot remove current or future phase';
      }
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
  setCurrentPhase, 
  copyPhase, 
  addPhase, 
  removePhase,
  setLoading,
  setError 
} = phaseSlice.actions;

// Selectors with error handling
export const selectCurrentPhase = (state) => state.phase.currentPhase;
export const selectPhases = (state) => state.phase.phases;
export const selectPhaseError = (state) => state.phase.error;
export const selectPhaseLoading = (state) => state.phase.loading;

export const selectPhaseById = (state, phaseId) => {
  if (!state.phase.phases.includes(phaseId)) {
    return null;
  }
  return phaseId;
};

export const selectPhaseData = (state, phaseId) => {
  const phase = selectPhaseById(state, phaseId);
  if (!phase) {
    return null;
  }
  return {
    id: phase,
    isCurrent: phase === state.phase.currentPhase,
    canBeRemoved: phase !== 'current' && phase !== 'future'
  };
};

export default phaseSlice.reducer; 