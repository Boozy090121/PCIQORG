import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  factories: [],
  loading: false,
  error: null
};

const factorySlice = createSlice({
  name: 'factories',
  initialState,
  reducers: {
    setFactories: (state, action) => {
      state.factories = action.payload;
      state.loading = false;
      state.error = null;
    },
    addFactory: (state, action) => {
      state.factories.push({
        id: Date.now().toString(),
        ...action.payload
      });
    },
    updateFactory: (state, action) => {
      const index = state.factories.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.factories[index] = {
          ...state.factories[index],
          ...action.payload
        };
      }
    },
    deleteFactory: (state, action) => {
      state.factories = state.factories.filter(f => f.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setFactories,
  addFactory,
  updateFactory,
  deleteFactory,
  setLoading,
  setError
} = factorySlice.actions;

// Selectors
export const selectAllFactories = (state) => state.factories.factories;
export const selectFactoryById = (state, factoryId) =>
  state.factories.factories.find(f => f.id === factoryId);
export const selectFactoriesByLocation = (state, location) =>
  state.factories.factories.filter(f => f.location === location);
export const selectFactoriesLoading = (state) => state.factories.loading;
export const selectFactoriesError = (state) => state.factories.error;

export default factorySlice.reducer; 