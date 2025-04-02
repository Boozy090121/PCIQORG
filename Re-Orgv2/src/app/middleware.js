import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setCurrentPhase, setError as setPhaseError } from '../features/PhaseManagement/phaseSlice';
import { updateTransitionProgress, setError as setTransitionError } from '../features/PhaseManagement/transitionPlanSlice';

export const listenerMiddleware = createListenerMiddleware();

// Handle phase changes
listenerMiddleware.startListening({
  actionCreator: setCurrentPhase,
  effect: async (action, listenerApi) => {
    try {
      const state = listenerApi.getState();
      const currentPhase = state.phase.currentPhase;
      
      // TODO: Implement API call to update phase
      // await api.updatePhase(currentPhase);
      
      // TODO: Implement data loading for the new phase
      // await listenerApi.dispatch(loadPhaseData(currentPhase));
    } catch (error) {
      listenerApi.dispatch(setPhaseError(error.message));
    }
  }
});

// Handle transition progress updates
listenerMiddleware.startListening({
  actionCreator: updateTransitionProgress,
  effect: async (action, listenerApi) => {
    try {
      const { factory, transitionId, progress } = action.payload;
      
      // TODO: Implement API call to update transition progress
      // await api.updateTransitionProgress(factory, transitionId, progress);
      
      // TODO: Implement related transitions update
      // await listenerApi.dispatch(updateRelatedTransitions(factory, transitionId));
    } catch (error) {
      listenerApi.dispatch(setTransitionError(error.message));
    }
  }
});

export default listenerMiddleware; 