import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  factories: [],
  currentFactory: null,
  loading: false,
  error: null
};

const focusFactorySlice = createSlice({
  name: 'focusFactory',
  initialState,
  reducers: {
    setFactories: (state, action) => {
      state.factories = action.payload;
    },
    addFactory: (state, action) => {
      state.factories.push(action.payload);
    },
    updateFactory: (state, action) => {
      const { id, ...updates } = action.payload;
      const factory = state.factories.find(f => f.id === id);
      if (factory) {
        Object.assign(factory, updates);
      }
      if (state.currentFactory?.id === id) {
        state.currentFactory = { ...state.currentFactory, ...updates };
      }
    },
    deleteFactory: (state, action) => {
      state.factories = state.factories.filter(factory => factory.id !== action.payload);
      if (state.currentFactory?.id === action.payload) {
        state.currentFactory = null;
      }
    },
    setCurrentFactory: (state, action) => {
      state.currentFactory = action.payload;
    },
    updateFactoryStatus: (state, action) => {
      const { id, status } = action.payload;
      const factory = state.factories.find(f => f.id === id);
      if (factory) {
        factory.status = status;
      }
      if (state.currentFactory?.id === id) {
        state.currentFactory.status = status;
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
  setFactories,
  addFactory,
  updateFactory,
  deleteFactory,
  setCurrentFactory,
  updateFactoryStatus,
  setLoading,
  setError,
  clearError
} = focusFactorySlice.actions;

// Selectors
export const selectCurrentFactory = (state) => state.focusFactory.currentFactory;

export default focusFactorySlice.reducer; 