import { configureStore } from '@reduxjs/toolkit';
import focusFactoryReducer from '@features/Organization/focusFactorySlice';
import orgChartReducer from '@features/Organization/orgChartSlice';
import roleReducer from '@features/Organization/roleSlice';
import personnelReducer from '@features/Organization/personnelSlice';
import phaseReducer from '@features/PhaseManagement/phaseSlice';
import implementationTrackingReducer from '@features/PhaseManagement/implementationTrackingSlice';
import transitionPlanReducer from '@features/PhaseManagement/transitionPlanSlice';

const store = configureStore({
  reducer: {
    focusFactory: focusFactoryReducer,
    phase: phaseReducer,
    roles: roleReducer,
    personnel: personnelReducer,
    orgChart: orgChartReducer,
    implementationTracking: implementationTrackingReducer,
    transitionPlan: transitionPlanReducer,
  },
});

export default store;
