import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null
};

const transitionPlanSlice = createSlice({
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
      const { id, ...updates } = action.payload;
      const plan = state.plans.find(p => p.id === id);
      if (plan) {
        Object.assign(plan, updates);
      }
      if (state.currentPlan?.id === id) {
        state.currentPlan = { ...state.currentPlan, ...updates };
      }
    },
    deletePlan: (state, action) => {
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
      if (state.currentPlan?.id === action.payload) {
        state.currentPlan = null;
      }
    },
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    addStep: (state, action) => {
      const { planId, step } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan) {
        if (!plan.steps) {
          plan.steps = [];
        }
        plan.steps.push(step);
      }
      if (state.currentPlan?.id === planId) {
        if (!state.currentPlan.steps) {
          state.currentPlan.steps = [];
        }
        state.currentPlan.steps.push(step);
      }
    },
    updateStep: (state, action) => {
      const { planId, stepId, updates } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan && plan.steps) {
        const step = plan.steps.find(s => s.id === stepId);
        if (step) {
          Object.assign(step, updates);
        }
      }
      if (state.currentPlan?.id === planId && state.currentPlan.steps) {
        const step = state.currentPlan.steps.find(s => s.id === stepId);
        if (step) {
          Object.assign(step, updates);
        }
      }
    },
    deleteStep: (state, action) => {
      const { planId, stepId } = action.payload;
      const plan = state.plans.find(p => p.id === planId);
      if (plan && plan.steps) {
        plan.steps = plan.steps.filter(s => s.id !== stepId);
      }
      if (state.currentPlan?.id === planId && state.currentPlan.steps) {
        state.currentPlan.steps = state.currentPlan.steps.filter(s => s.id !== stepId);
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
  setPlans,
  addPlan,
  updatePlan,
  deletePlan,
  setCurrentPlan,
  addStep,
  updateStep,
  deleteStep,
  setLoading,
  setError,
  clearError
} = transitionPlanSlice.actions;

export default transitionPlanSlice.reducer; 