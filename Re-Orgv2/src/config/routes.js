import React from 'react';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('@features/Dashboard'));
const FocusFactory = React.lazy(() => import('@features/Organization/FocusFactory'));
const PhaseManagement = React.lazy(() => import('@features/PhaseManagement/PhaseManagement'));

// Define application routes
export const routes = [
  {
    path: '/',
    element: Dashboard,
    exact: true
  },
  {
    path: '/focus-factory',
    element: FocusFactory
  },
  {
    path: '/phase-management',
    element: PhaseManagement
  },
  {
    path: '*',
    element: () => <div>Page Not Found</div>
  }
]; 