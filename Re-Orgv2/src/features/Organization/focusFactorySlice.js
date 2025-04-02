import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  factories: [],
  loading: false,
  error: null,
  currentFactory: null
};

export const focusFactorySlice = createSlice({
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
      const index = state.factories.findIndex(factory => factory.id === action.payload.id);
      if (index !== -1) {
        state.factories[index] = action.payload;
      }
    },
    deleteFactory: (state, action) => {
      state.factories = state.factories.filter(factory => factory.id !== action.payload);
    },
    setCurrentFactory: (state, action) => {
      state.currentFactory = action.payload;
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
  setFactories, 
  addFactory, 
  updateFactory, 
  deleteFactory, 
  setCurrentFactory,
  setLoading,
  setError
} = focusFactorySlice.actions;

// Selectors
export const selectCurrentFactory = (state) => state.focusFactory.currentFactory;

export default focusFactorySlice.reducer; 