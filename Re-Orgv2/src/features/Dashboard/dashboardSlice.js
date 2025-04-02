import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {
    factories: {
      value: 0,
      change: 0
    },
    phases: {
      value: 0,
      change: 0
    },
    resourceAllocation: {
      value: '0%',
      change: 0
    }
  },
  trends: {
    phaseProgress: [],
    resourceDistribution: []
  },
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateMetrics: (state, action) => {
      state.metrics = {
        ...state.metrics,
        ...action.payload
      };
    },
    updateTrends: (state, action) => {
      state.trends = {
        ...state.trends,
        ...action.payload
      };
    },
    addPhaseProgressTrend: (state, action) => {
      state.trends.phaseProgress.push(action.payload);
    },
    addResourceDistributionTrend: (state, action) => {
      state.trends.resourceDistribution.push(action.payload);
    },
    clearTrends: (state) => {
      state.trends = {
        phaseProgress: [],
        resourceDistribution: []
      };
    }
  }
});

export const {
  setLoading,
  setError,
  updateMetrics,
  updateTrends,
  addPhaseProgressTrend,
  addResourceDistributionTrend,
  clearTrends
} = dashboardSlice.actions;

// Selectors
export const selectDashboardMetrics = state => state.dashboard.metrics;
export const selectDashboardTrends = state => state.dashboard.trends;
export const selectDashboardLoading = state => state.dashboard.loading;
export const selectDashboardError = state => state.dashboard.error;

// Thunks
export const fetchDashboardData = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    // Here you would typically make API calls to fetch the data
    // For now, we'll use mock data
    const mockMetrics = {
      factories: {
        value: 3,
        change: 0
      },
      phases: {
        value: 4,
        change: 25
      },
      resourceAllocation: {
        value: '85%',
        change: 5
      }
    };

    const mockTrends = {
      phaseProgress: [
        {
          title: 'Phase 3 Implementation',
          description: 'Current phase implementation is on track with 85% completion rate.',
          status: 'success'
        },
        {
          title: 'Resource Optimization',
          description: 'Resource utilization improved by 12% in the last month.',
          status: 'success'
        },
        {
          title: 'Milestone Alert',
          description: 'Upcoming milestone: Quality Assessment due in 5 days.',
          status: 'warning'
        }
      ],
      resourceDistribution: [
        {
          title: 'Balanced Allocation',
          description: 'Resources are efficiently distributed across all focus factories.',
          status: 'success'
        },
        {
          title: 'Skill Gap Analysis',
          description: 'Identified need for additional technical expertise in Factory B.',
          status: 'warning'
        },
        {
          title: 'Training Progress',
          description: '90% of team members completed required training modules.',
          status: 'success'
        }
      ]
    };

    dispatch(updateMetrics(mockMetrics));
    dispatch(updateTrends(mockTrends));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default dashboardSlice.reducer; 