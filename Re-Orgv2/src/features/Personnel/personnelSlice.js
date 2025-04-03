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
    addPerson: (state, action) => {
      state.personnel.push(action.payload);
    },
    updatePerson: (state, action) => {
      const { id, ...updates } = action.payload;
      const person = state.personnel.find(p => p.id === id);
      if (person) {
        Object.assign(person, updates);
      }
    },
    deletePerson: (state, action) => {
      state.personnel = state.personnel.filter(person => person.id !== action.payload);
    },
    assignPerson: (state, action) => {
      const { id, taskId } = action.payload;
      const person = state.personnel.find(p => p.id === id);
      if (person) {
        person.assigned = true;
        person.assignedTaskId = taskId;
      }
    },
    unassignPerson: (state, action) => {
      const person = state.personnel.find(p => p.id === action.payload);
      if (person) {
        person.assigned = false;
        person.assignedTaskId = null;
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
  setPersonnel,
  addPerson,
  updatePerson,
  deletePerson,
  assignPerson,
  unassignPerson,
  setLoading,
  setError,
  clearError
} = personnelSlice.actions;

export default personnelSlice.reducer; 