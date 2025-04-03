import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  loading: false,
  error: null
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    }
  }
});

export const { addRole, updateRole, deleteRole, setRoles } = roleSlice.actions;
export default roleSlice.reducer; 