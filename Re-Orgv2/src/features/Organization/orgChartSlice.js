import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [],
  loading: false,
  error: null,
  selectedDepartment: null
};

export const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    updateDepartment: (state, action) => {
      const index = state.departments.findIndex(dept => dept.id === action.payload.id);
      if (index !== -1) {
        state.departments[index] = action.payload;
      }
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(dept => dept.id !== action.payload);
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
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
  setDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  setSelectedDepartment,
  setLoading,
  setError
} = orgChartSlice.actions;

export default orgChartSlice.reducer; 