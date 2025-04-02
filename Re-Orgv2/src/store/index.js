import { configureStore } from '@reduxjs/toolkit';
import focusFactoryReducer, { setFactories, setCurrentFactory } from '@features/Organization/focusFactorySlice';
import orgChartReducer, { setOrgChart } from '@features/Organization/orgChartSlice';
import roleReducer, { setRoles } from '@features/Organization/roleSlice';
import personnelReducer, { setPersonnel } from '@features/Organization/personnelSlice';
import phaseReducer from '@features/PhaseManagement/phaseSlice';
import implementationTrackingReducer from '@features/PhaseManagement/implementationTrackingSlice';
import transitionPlanReducer from '@features/PhaseManagement/transitionPlanSlice';
import { mockFactories, mockRoles, mockPersonnel, mockOrgChart } from '@features/Organization/mockData';

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

// Initialize store with mock data
store.dispatch(setFactories(mockFactories));
store.dispatch(setCurrentFactory(mockFactories[0]));
store.dispatch(setRoles(mockRoles));
store.dispatch(setPersonnel(mockPersonnel));
store.dispatch(setOrgChart(mockOrgChart));

export default store;
