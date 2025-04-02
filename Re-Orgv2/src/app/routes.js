import { MainLayout } from '../components/Layout/MainLayout';
import { TrainingNeedsAnalysis } from '../features/Training/components/TrainingAnalysis/TrainingNeedsAnalysis';
import { TransitionPlanView } from '../features/PhaseManagement/components/TransitionPlanView';
import { ImplementationTrackingView } from '../features/PhaseManagement/components/ImplementationTrackingView';

export const routes = [
  {
    path: '/',
    element: MainLayout,
    children: [
      {
        path: '/',
        element: TrainingNeedsAnalysis
      },
      {
        path: '/training',
        element: TrainingNeedsAnalysis
      },
      {
        path: '/transition-plan',
        element: TransitionPlanView
      },
      {
        path: '/implementation',
        element: ImplementationTrackingView
      }
    ]
  }
]; 