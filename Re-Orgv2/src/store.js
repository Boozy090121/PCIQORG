import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/authSlice';
import orgChartReducer from './features/OrgChart/orgChartSlice';
import phaseReducer from './features/Phase/phaseSlice';
import roleReducer from './features/Roles/roleSlice';
import personnelReducer from './features/Personnel/personnelSlice';
import focusFactoryReducer from './features/Organization/focusFactorySlice';
import implementationTrackingReducer from './features/Implementation/implementationTrackingSlice';
import transitionPlanReducer from './features/Implementation/transitionPlanSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    orgChart: orgChartReducer,
    phase: phaseReducer,
    role: roleReducer,
    personnel: personnelReducer,
    focusFactory: focusFactoryReducer,
    implementationTracking: implementationTrackingReducer,
    transitionPlan: transitionPlanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: [
          'auth.currentUser',
          'orgChart.nodes',
          'orgChart.edges',
          'implementationTracking.tasks',
          'implementationTracking.milestones',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Make store available globally for Firebase service
if (typeof window !== 'undefined') {
  window.store = store;
}

export default store; 