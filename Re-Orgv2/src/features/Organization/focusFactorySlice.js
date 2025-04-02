import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFactory: null
};

const focusFactorySlice = createSlice({
  name: 'focusFactory',
  initialState,
  reducers: {
    setCurrentFactory: (state, action) => {
      state.currentFactory = action.payload;
    },
    clearCurrentFactory: (state) => {
      state.currentFactory = null;
    }
  }
});

export const { setCurrentFactory, clearCurrentFactory } = focusFactorySlice.actions;

// Selectors
export const selectCurrentFactory = (state) => state.focusFactory.currentFactory;

export default focusFactorySlice.reducer; 