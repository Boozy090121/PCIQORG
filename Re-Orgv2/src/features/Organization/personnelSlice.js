import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personnel: [],
  loading: false,
  error: null
};

const personnelSlice = createSlice({
  name: 'personnel',
  initialState,
  reducers: {
    setPersonnel: (state, action) => {
      state.personnel = action.payload;
    },
    addPersonnel: (state, action) => {
      state.personnel.push(action.payload);
    },
    updatePersonnel: (state, action) => {
      const index = state.personnel.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.personnel[index] = action.payload;
      }
    },
    deletePersonnel: (state, action) => {
      state.personnel = state.personnel.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPerformanceReview: (state, action) => {
      const { personnelId, review } = action.payload;
      const personnel = state.personnel.find(p => p.id === personnelId);
      if (personnel) {
        if (!personnel.performanceReviews) {
          personnel.performanceReviews = [];
        }
        personnel.performanceReviews.push({
          ...review,
          id: Date.now().toString(),
          date: new Date().toISOString()
        });
      }
    },
    addTraining: (state, action) => {
      const { personnelId, training } = action.payload;
      const personnel = state.personnel.find(p => p.id === personnelId);
      if (personnel) {
        if (!personnel.trainings) {
          personnel.trainings = [];
        }
        personnel.trainings.push({
          ...training,
          id: Date.now().toString(),
          date: new Date().toISOString()
        });
      }
    },
    addLeave: (state, action) => {
      const { personnelId, leave } = action.payload;
      const personnel = state.personnel.find(p => p.id === personnelId);
      if (personnel) {
        if (!personnel.leaves) {
          personnel.leaves = [];
        }
        personnel.leaves.push({
          ...leave,
          id: Date.now().toString(),
          date: new Date().toISOString()
        });
      }
    },
    updateRoleHistory: (state, action) => {
      const { personnelId, roleId } = action.payload;
      const personnel = state.personnel.find(p => p.id === personnelId);
      if (personnel) {
        if (!personnel.roleHistory) {
          personnel.roleHistory = [];
        }
        personnel.roleHistory.push({
          roleId,
          date: new Date().toISOString()
        });
        personnel.currentRole = roleId;
      }
    }
  }
});

export const {
  setPersonnel,
  addPersonnel,
  updatePersonnel,
  deletePersonnel,
  setLoading,
  setError,
  addPerformanceReview,
  addTraining,
  addLeave,
  updateRoleHistory
} = personnelSlice.actions;

// Selectors
export const selectAllPersonnel = state => state.personnel.personnel;
export const selectPersonnelByFactory = (state, factoryId) => 
  state.personnel.personnel.filter(person => person.factoryId === factoryId);
export const selectPersonnelById = (state, personnelId) => 
  state.personnel.personnel.find(person => person.id === personnelId);
export const selectPersonnelByRole = (state, roleId) =>
  state.personnel.personnel.filter(person => person.currentRole === roleId);
export const selectPersonnelLoading = state => state.personnel.loading;
export const selectPersonnelError = state => state.personnel.error;

export default personnelSlice.reducer; 