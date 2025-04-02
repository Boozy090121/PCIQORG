import { configureStore } from '@reduxjs/toolkit';
import focusFactoryReducer from '../features/Organization/focusFactorySlice';
import roleReducer from '../features/Organization/roleSlice';
import personnelReducer from '../features/Organization/personnelSlice';
import factoryReducer from '../features/Organization/factorySlice';
import trainingReducer from '../features/Training/trainingSlice';
import phaseReducer from '../features/PhaseManagement/phaseSlice';
import transitionPlanReducer from '../features/PhaseManagement/transitionPlanSlice';
import implementationTrackingReducer from '../features/PhaseManagement/implementationTrackingSlice';
import listenerMiddleware from './middleware';

export const store = configureStore({
  reducer: {
    focusFactory: focusFactoryReducer,
    roles: roleReducer,
    personnel: personnelReducer,
    factories: factoryReducer,
    training: trainingReducer,
    phase: phaseReducer,
    transitionPlan: transitionPlanReducer,
    implementationTracking: implementationTrackingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
}); 