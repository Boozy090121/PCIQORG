// Organization Feature
export * from './Organization/focusFactorySlice';
export * from './Organization/roleSlice';
export * from './Organization/personnelSlice';
export * from './Organization/factorySlice';

// Training Feature
export * from './Training/trainingSlice';
export * from './Training/components/TrainingAnalysis/TrainingNeedsAnalysis';

// Phase Management Feature
export * from './PhaseManagement/phaseSlice';
export * from './PhaseManagement/transitionPlanSlice';
export * from './PhaseManagement/implementationTrackingSlice';
export * from './PhaseManagement/components/TransitionPlanView';

// Implementation Feature
export * from './Implementation/components/ImplementationTrackingView';

// Feature Selectors
export const selectFeatureState = (state, feature) => state[feature];

// Feature Actions
export const createFeatureAction = (feature, action) => ({
  type: `${feature}/${action.type}`,
  payload: action.payload
}); 