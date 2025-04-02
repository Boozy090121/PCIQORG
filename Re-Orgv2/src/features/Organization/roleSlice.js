import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  loading: false,
  error: null
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action) => {
      const index = state.roles.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateRoleHierarchy: (state, action) => {
      const { roleId, parentId, position } = action.payload;
      const roleIndex = state.roles.findIndex(r => r.id === roleId);
      if (roleIndex !== -1) {
        state.roles[roleIndex] = {
          ...state.roles[roleIndex],
          parentId,
          position,
          updatedAt: new Date().toISOString()
        };
      }
    }
  }
});

export const {
  setRoles,
  addRole,
  updateRole,
  deleteRole,
  setLoading,
  setError,
  updateRoleHierarchy
} = roleSlice.actions;

// Selectors
export const selectAllRoles = state => state.roles.roles;
export const selectRolesByFactory = (state, factoryId) => 
  state.roles.roles.filter(role => role.factoryId === factoryId);
export const selectRoleById = (state, roleId) => 
  state.roles.roles.find(role => role.id === roleId);
export const selectChildRoles = (state, parentId) =>
  state.roles.roles.filter(role => role.parentId === parentId);
export const selectRoleHierarchy = (state, roleId) => {
  const role = selectRoleById(state, roleId);
  if (!role) return [];
  
  const hierarchy = [role];
  let currentRole = role;
  
  while (currentRole.parentId) {
    currentRole = selectRoleById(state, currentRole.parentId);
    if (currentRole) {
      hierarchy.unshift(currentRole);
    } else {
      break;
    }
  }
  
  return hierarchy;
};
export const selectRoleLoading = state => state.roles.loading;
export const selectRoleError = state => state.roles.error;

export default roleSlice.reducer; 