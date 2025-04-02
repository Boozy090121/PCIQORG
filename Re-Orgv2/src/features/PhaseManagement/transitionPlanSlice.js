import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  loading: false,
  error: null,
  selectedPlan: null
};

export const transitionPlanSlice = createSlice({
  name: 'transitionPlan',
  initialState,
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
    addPlan: (state, action) => {
      state.plans.push(action.payload);
    },
    updatePlan: (state, action) => {
      const index = state.plans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    deletePlan: (state, action) => {
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
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
  setPlans,
  addPlan,
  updatePlan,
  deletePlan,
  setSelectedPlan,
  setLoading,
  setError
} = transitionPlanSlice.actions;

export default transitionPlanSlice.reducer; 