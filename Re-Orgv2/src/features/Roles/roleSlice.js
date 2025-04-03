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
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action) => {
      const { id, ...updates } = action.payload;
      const role = state.roles.find(r => r.id === id);
      if (role) {
        Object.assign(role, updates);
      }
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
    assignRoleToPerson: (state, action) => {
      const { roleId, personId } = action.payload;
      const role = state.roles.find(r => r.id === roleId);
      if (role) {
        if (!role.assignedTo) {
          role.assignedTo = [];
        }
        if (!role.assignedTo.includes(personId)) {
          role.assignedTo.push(personId);
        }
      }
    },
    unassignRoleFromPerson: (state, action) => {
      const { roleId, personId } = action.payload;
      const role = state.roles.find(r => r.id === roleId);
      if (role && role.assignedTo) {
        role.assignedTo = role.assignedTo.filter(id => id !== personId);
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
  setRoles,
  addRole,
  updateRole,
  deleteRole,
  assignRoleToPerson,
  unassignRoleFromPerson,
  setLoading,
  setError,
  clearError
} = roleSlice.actions;

export default roleSlice.reducer; 