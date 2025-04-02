import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainingNeeds: [],
  analyses: [],
  loading: false,
  error: null
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setTrainingNeeds: (state, action) => {
      state.trainingNeeds = action.payload;
    },
    addTrainingNeed: (state, action) => {
      state.trainingNeeds.push(action.payload);
    },
    updateTrainingNeed: (state, action) => {
      const index = state.trainingNeeds.findIndex(need => need.id === action.payload.id);
      if (index !== -1) {
        state.trainingNeeds[index] = action.payload;
      }
    },
    deleteTrainingNeed: (state, action) => {
      state.trainingNeeds = state.trainingNeeds.filter(need => need.id !== action.payload);
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
  setTrainingNeeds,
  addTrainingNeed,
  updateTrainingNeed,
  deleteTrainingNeed,
  setLoading,
  setError
} = trainingSlice.actions;

export default trainingSlice.reducer; 