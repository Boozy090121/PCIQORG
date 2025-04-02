import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Upload as UploadIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Slider,
  TextField,
  Card,
  CardContent,
  CardActions,
  Link,
  Rating,
  Stack,
  FormControlLabel,
  Switch,
  InputAdornment,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper as MuiPaper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Alert,
  Snackbar,
  CircularProgress,
  Avatar
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TimelineIcon from '@mui/icons-material/Timeline';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { selectRolesByFactory } from '../../features/Organization/roleSlice';
import { selectPersonnelByFactory } from '../../features/Organization/personnelSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Brush,
  ReferenceLine,
  ReferenceArea,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Save as SaveIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Compare as CompareIcon,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  Psychology as PsychologyIcon,
  ExpandMore as ExpandMoreIcon,
  Share as ShareIcon,
  Close as CloseIcon,
  Flag as FlagIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Palette as PaletteIcon,
  Chat as ChatIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Extension as ExtensionIcon,
  Webhook as WebhookIcon,
  Group as GroupIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

/**
 * DepartmentAnalytics component for displaying detailed department metrics
 * @returns {JSX.Element} DepartmentAnalytics component
 */
export const DepartmentAnalytics = () => {
  const currentFactory = useSelector(selectCurrentFactory);
  const roles = useSelector(state => selectRolesByFactory(state, currentFactory));
  const personnel = useSelector(state => selectPersonnelByFactory(state, currentFactory));
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  const [compareDepartments, setCompareDepartments] = useState([]);
  const [timeRange, setTimeRange] = useState('6m');
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [drillDownData, setDrillDownData] = useState(null);
  const [chartRef, setChartRef] = useState(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importError, setImportError] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedRoleType, setSelectedRoleType] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedDepartmentForRecommendations, setSelectedDepartmentForRecommendations] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showPerformanceWeights, setShowPerformanceWeights] = useState(false);
  const [performanceWeights, setPerformanceWeights] = useState({
    skillScore: 0.4,
    roleScore: 0.3,
    efficiencyScore: 0.3
  });
  const [showTrainingResources, setShowTrainingResources] = useState(false);
  const [selectedSkillForTraining, setSelectedSkillForTraining] = useState(null);
  const [showPerformanceComparison, setShowPerformanceComparison] = useState(false);
  const [selectedDepartmentsForComparison, setSelectedDepartmentsForComparison] = useState([]);
  const [trainingSearchTerm, setTrainingSearchTerm] = useState('');
  const [trainingFilters, setTrainingFilters] = useState({
    priceRange: [0, 1000],
    duration: 'all',
    rating: 0,
    provider: 'all'
  });
  const [showForecastDialog, setShowForecastDialog] = useState(false);
  const [selectedDepartmentForForecast, setSelectedDepartmentForForecast] = useState(null);
  const [forecastPeriod, setForecastPeriod] = useState(6);
  const [chartType, setChartType] = useState('bar');
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [chartOptions, setChartOptions] = useState({
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    showReferenceLines: true
  });
  const [forecastAlgorithm, setForecastAlgorithm] = useState('linear');
  const [forecastConfidence, setForecastConfidence] = useState(0.95);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [exportFields, setExportFields] = useState({
    metrics: true,
    trends: true,
    forecasts: true,
    comparisons: true
  });
  const [showBenchmarkDialog, setShowBenchmarkDialog] = useState(false);
  const [selectedBenchmarkMetrics, setSelectedBenchmarkMetrics] = useState([]);
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [chartInteractions, setChartInteractions] = useState({
    zoom: false,
    pan: false,
    brush: false,
    tooltip: true
  });
  const [analyticsTab, setAnalyticsTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showCustomReportDialog, setShowCustomReportDialog] = useState(false);
  const [customReportConfig, setCustomReportConfig] = useState({
    name: '',
    metrics: [],
  });
  const [dataFilters, setDataFilters] = useState({
    dateRange: { start: null, end: null },
    departments: [],
    metrics: [],
    thresholds: {}
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);
  const [correlationMatrix, setCorrelationMatrix] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [chartLayout, setChartLayout] = useState([]);
  const [showChartCustomization, setShowChartCustomization] = useState(false);
  const [savedLayouts, setSavedLayouts] = useState([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareOptions, setShareOptions] = useState({
    format: 'pdf',
    recipients: [],
    message: ''
  });
  const [comments, setComments] = useState([]);
  const [selectedChartForComment, setSelectedChartForComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [chartTheme, setChartTheme] = useState({
    primary: '#8884d8',
    secondary: '#82ca9d',
    tertiary: '#ffc658',
    background: '#ffffff',
    text: '#000000',
    grid: '#e0e0e0',
    tooltip: '#ffffff',
    legend: '#000000'
  });
  const [customKPIs, setCustomKPIs] = useState([]);
  const [showKPIDialog, setShowKPIDialog] = useState(false);
  const [goals, setGoals] = useState([]);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showAddKPIDialog, setShowAddKPIDialog] = useState(false);
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  const [newKPI, setNewKPI] = useState({
    name: '',
    formula: '',
    target: '',
    unit: ''
  });
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: '',
    description: ''
  });
  const [chartAnnotations, setChartAnnotations] = useState([]);
  const [showAnnotationDialog, setShowAnnotationDialog] = useState(false);
  const [selectedChartForAnnotation, setSelectedChartForAnnotation] = useState(null);
  const [actionItems, setActionItems] = useState([]);
  const [showActionItemDialog, setShowActionItemDialog] = useState(false);
  const [sharedDashboards, setSharedDashboards] = useState([]);
  const [showShareDashboardDialog, setShowShareDashboardDialog] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [dashboardRecipients, setDashboardRecipients] = useState([]);
  const [allowEditing, setAllowEditing] = useState(false);
  const [dashboardMessage, setDashboardMessage] = useState('');
  const [newAnnotation, setNewAnnotation] = useState({
    type: 'text',
    text: '',
    x: 0,
    y: 0,
    color: '#ff0000'
  });
  const [statisticalAnalysis, setStatisticalAnalysis] = useState({
    correlation: null,
    regression: null,
    hypothesis: null,
    anomalies: []
  });
  const [mlInsights, setMLInsights] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showTeamChat, setShowTeamChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userPresence, setUserPresence] = useState({});
  const [sharedDashboardSettings, setSharedDashboardSettings] = useState({
    permissions: {},
    viewers: [],
    editors: []
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cachedData, setCachedData] = useState({});
  const [cacheExpiry, setCacheExpiry] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    encryption: true,
    sessionTimeout: 30,
    requireMFA: false,
    allowedIPs: []
  });
  const [integrations, setIntegrations] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    type: '',
    name: '',
    config: {}
  });
  const [newWebhook, setNewWebhook] = useState({
    url: '',
    events: [],
    secret: ''
  });
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [showCollaborationSettings, setShowCollaborationSettings] = useState(false);
  const [collaborationSettings, setCollaborationSettings] = useState({
    allowEditing: true,
    requireApproval: false,
    autoSave: true,
    conflictResolution: 'last-write-wins',
    notifyOnChange: true
  });
  const [userCursors, setUserCursors] = useState({});
  const [userSelections, setUserSelections] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [userActivity, setUserActivity] = useState({});
  const [showUserActivity, setShowUserActivity] = useState(false);

  if (!currentFactory) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please select a factory to view department analytics
        </Typography>
      </Box>
    );
  }

  const departments = currentFactory.departments || [];
  const selectedDept = selectedDepartment === 'all' ? null : selectedDepartment;

  // Calculate department metrics
  const departmentMetrics = departments.map(dept => {
    const deptRoles = roles.filter(role => role.department === dept);
    const deptPersonnel = personnel.filter(person => person.department === dept);
    const uniqueSkills = [...new Set(deptRoles.flatMap(role => role.skills || []))];
    
    // Calculate additional metrics
    const roleTypes = deptRoles.reduce((acc, role) => {
      acc[role.type] = (acc[role.type] || 0) + 1;
      return acc;
    }, {});

    const skillDistribution = uniqueSkills.reduce((acc, skill) => {
      acc[skill] = deptRoles.filter(role => role.skills?.includes(skill)).length;
      return acc;
    }, {});

    return {
      name: dept,
      roles: deptRoles.length,
      personnel: deptPersonnel.length,
      skills: uniqueSkills.length,
      rolePersonnelRatio: deptRoles.length > 0 ? deptPersonnel.length / deptRoles.length : 0,
      skillsPerRole: deptRoles.length > 0 ? uniqueSkills.length / deptRoles.length : 0,
      efficiency: calculateDepartmentEfficiency(deptRoles, deptPersonnel, uniqueSkills),
      roleTypes,
      skillDistribution,
      personnelByRole: deptRoles.map(role => ({
        role: role.title,
        count: deptPersonnel.filter(person => person.currentRole === role.id).length
      }))
    };
  });

  // Calculate overall metrics
  const overallMetrics = {
    totalRoles: roles.length,
    totalPersonnel: personnel.length,
    totalDepartments: departments.length,
    averageRolesPerDept: roles.length / departments.length,
    averagePersonnelPerDept: personnel.length / departments.length,
    roleTypeDistribution: roles.reduce((acc, role) => {
      acc[role.type] = (acc[role.type] || 0) + 1;
      return acc;
    }, {}),
    skillDistribution: [...new Set(roles.flatMap(role => role.skills || []))].reduce((acc, skill) => {
      acc[skill] = roles.filter(role => role.skills?.includes(skill)).length;
      return acc;
    }, {})
  };

  // Filter metrics based on selected department
  const filteredMetrics = selectedDept
    ? departmentMetrics.filter(metric => metric.name === selectedDept)
    : departmentMetrics;

  // Generate trend data (mock data for demonstration)
  const generateTrendData = (months) => {
    return Array.from({ length: months }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      roles: Math.floor(Math.random() * 10) + 5,
      personnel: Math.floor(Math.random() * 20) + 10,
      skills: Math.floor(Math.random() * 15) + 8,
      efficiency: Math.random() * 0.5 + 0.5
    }));
  };

  const trendData = generateTrendData(6);

  // Calculate department efficiency score
  function calculateDepartmentEfficiency(roles, personnel, skills) {
    const rolePersonnelRatio = roles.length > 0 ? personnel.length / roles.length : 0;
    const skillsPerRole = roles.length > 0 ? skills.length / roles.length : 0;
    return (rolePersonnelRatio + skillsPerRole) / 2;
  }

  // Handle department comparison
  const handleCompareDepartments = (dept) => {
    if (compareDepartments.includes(dept)) {
      setCompareDepartments(compareDepartments.filter(d => d !== dept));
    } else if (compareDepartments.length < 3) {
      setCompareDepartments([...compareDepartments, dept]);
    }
  };

  const comparedMetrics = departmentMetrics.filter(metric => 
    compareDepartments.includes(metric.name)
  );

  // Handle chart zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  // Handle chart drill-down
  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      const metric = data.activePayload[0].payload;
      setSelectedMetric(metric);
      setDrillDownData(metric.personnelByRole);
    }
  };

  // Handle data export
  const handleExportData = (view, format) => {
    let data;
    switch (view) {
      case 'overview':
        data = {
          factory: currentFactory.name,
          overallMetrics,
          departmentMetrics: filteredMetrics,
          timestamp: new Date().toISOString()
        };
        break;
      case 'compare':
        data = {
          factory: currentFactory.name,
          comparedDepartments: comparedMetrics,
          comparisonTimestamp: new Date().toISOString()
        };
        break;
      case 'trends':
        data = {
          factory: currentFactory.name,
          timeRange,
          trendData,
          forecastData: selectedDepartmentForForecast ? 
            generateAdvancedForecast(selectedDepartmentForForecast, forecastAlgorithm) : null
        };
        break;
      default:
        return;
    }

    if (format === 'csv') {
      // Convert to CSV
      const headers = Object.keys(data);
      const rows = [headers];
      const values = headers.map(header => {
        if (typeof data[header] === 'object') {
          return JSON.stringify(data[header]);
        }
        return data[header];
      });
      rows.push(values);

      const csvContent = rows.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentFactory.name}_${view}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // JSON export
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentFactory.name}_${view}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Calculate skill gaps
  const calculateSkillGaps = (dept) => {
    const deptRoles = roles.filter(role => role.department === dept);
    const deptPersonnel = personnel.filter(person => person.department === dept);
    const requiredSkills = [...new Set(deptRoles.flatMap(role => role.skills || []))];
    const personnelSkills = [...new Set(deptPersonnel.flatMap(person => person.skills || []))];
    
    return {
      missingSkills: requiredSkills.filter(skill => !personnelSkills.includes(skill)),
      surplusSkills: personnelSkills.filter(skill => !requiredSkills.includes(skill)),
      coverage: requiredSkills.length > 0 ? 
        (requiredSkills.filter(skill => personnelSkills.includes(skill)).length / requiredSkills.length) * 100 : 0
    };
  };

  // Calculate role coverage
  const calculateRoleCoverage = (dept) => {
    const deptRoles = roles.filter(role => role.department === dept);
    const deptPersonnel = personnel.filter(person => person.department === dept);
    
    return deptRoles.map(role => ({
      role: role.title,
      required: role.requiredPersonnel || 1,
      current: deptPersonnel.filter(person => person.currentRole === role.id).length,
      coverage: role.requiredPersonnel ? 
        (deptPersonnel.filter(person => person.currentRole === role.id).length / role.requiredPersonnel) * 100 : 0
    }));
  };

  // Calculate department performance score with custom weights
  const calculateDepartmentPerformance = (dept) => {
    const skillGaps = calculateSkillGaps(dept);
    const roleCoverage = calculateRoleCoverage(dept);
    const efficiency = departmentMetrics.find(m => m.name === dept)?.efficiency || 0;
    
    const skillScore = skillGaps.coverage / 100;
    const roleScore = roleCoverage.reduce((acc, role) => acc + (role.coverage / 100), 0) / roleCoverage.length;
    
    return {
      overall: (
        skillScore * performanceWeights.skillScore +
        roleScore * performanceWeights.roleScore +
        efficiency * performanceWeights.efficiencyScore
      ) * 100,
      skillScore: skillScore * 100,
      roleScore: roleScore * 100,
      efficiencyScore: efficiency * 100
    };
  };

  // Generate skill recommendations
  const generateSkillRecommendations = (dept) => {
    const skillGaps = calculateSkillGaps(dept);
    const deptRoles = roles.filter(role => role.department === dept);
    const deptPersonnel = personnel.filter(person => person.department === dept);
    
    return skillGaps.missingSkills.map(skill => {
      const rolesNeedingSkill = deptRoles.filter(role => role.skills?.includes(skill));
      const personnelWithSimilarSkills = deptPersonnel.filter(person => 
        person.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
      
      return {
        skill,
        rolesNeeding: rolesNeedingSkill.map(role => role.title),
        personnelCount: personnelWithSimilarSkills.length,
        recommendation: personnelWithSimilarSkills.length > 0
          ? 'Consider upskilling existing personnel'
          : 'Consider hiring or training new personnel'
      };
    });
  };

  // Generate historical data
  const generateHistoricalData = (dept) => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      
      return {
        month: `${month} ${year}`,
        roles: Math.floor(Math.random() * 10) + 5,
        personnel: Math.floor(Math.random() * 20) + 10,
        skills: Math.floor(Math.random() * 15) + 8,
        efficiency: Math.random() * 0.5 + 0.5,
        coverage: Math.random() * 0.3 + 0.7
      };
    }).reverse();
  };

  // Validate imported data
  const validateImportedData = (data) => {
    const errors = [];
    
    if (!data.factory) {
      errors.push('Factory information is missing');
    }
    
    if (!Array.isArray(data.departmentMetrics)) {
      errors.push('Department metrics must be an array');
    } else {
      data.departmentMetrics.forEach((metric, index) => {
        if (!metric.name) {
          errors.push(`Department ${index + 1} is missing a name`);
        }
        if (typeof metric.roles !== 'number') {
          errors.push(`Department ${metric.name} has invalid roles count`);
        }
        if (typeof metric.personnel !== 'number') {
          errors.push(`Department ${metric.name} has invalid personnel count`);
        }
        if (!Array.isArray(metric.skills)) {
          errors.push(`Department ${metric.name} has invalid skills array`);
        }
      });
    }
    
    return errors;
  };

  // Handle data import with validation
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const errors = validateImportedData(data);
        
        if (errors.length > 0) {
          setValidationErrors(errors);
          setImportError('Data validation failed');
          return;
        }
        
        // Process imported data
        // Note: In a real application, you would dispatch actions to update the store
        setImportError(null);
        setShowImportDialog(false);
        setValidationErrors([]);
      } catch (error) {
        setImportError(error.message);
        setValidationErrors([]);
      }
    };
    reader.readAsText(file);
  };

  // Generate training resources
  const generateTrainingResources = (skill) => {
    // Mock training resources - in a real app, this would come from an API
    return [
      {
        title: `Online Course: ${skill} Fundamentals`,
        provider: 'Udemy',
        rating: 4.5,
        duration: '8 hours',
        price: '$49.99',
        url: '#',
        description: 'Comprehensive course covering all aspects of ' + skill
      },
      {
        title: `${skill} Workshop`,
        provider: 'Local Training Center',
        rating: 4.2,
        duration: '2 days',
        price: '$299',
        url: '#',
        description: 'Hands-on workshop with practical exercises'
      },
      {
        title: `${skill} Certification`,
        provider: 'Professional Institute',
        rating: 4.8,
        duration: '3 months',
        price: '$999',
        url: '#',
        description: 'Professional certification program'
      }
    ];
  };

  // Compare department performance
  const compareDepartmentPerformance = (dept1, dept2) => {
    const perf1 = calculateDepartmentPerformance(dept1);
    const perf2 = calculateDepartmentPerformance(dept2);
    
    return {
      overall: perf1.overall - perf2.overall,
      skillScore: perf1.skillScore - perf2.skillScore,
      roleScore: perf1.roleScore - perf2.roleScore,
      efficiencyScore: perf1.efficiencyScore - perf2.efficiencyScore
    };
  };

  // Load saved performance weights from localStorage
  useEffect(() => {
    const savedWeights = localStorage.getItem('performanceWeights');
    if (savedWeights) {
      setPerformanceWeights(JSON.parse(savedWeights));
    }
  }, []);

  // Save performance weights to localStorage
  const handleSaveWeights = () => {
    localStorage.setItem('performanceWeights', JSON.stringify(performanceWeights));
  };

  // Generate performance forecast
  const generatePerformanceForecast = (dept) => {
    const currentPerformance = calculateDepartmentPerformance(dept);
    const historicalData = generateHistoricalData(dept);
    
    // Simple linear regression for forecasting
    const last12Months = historicalData.slice(-12);
    const x = Array.from({ length: 12 }, (_, i) => i);
    const y = last12Months.map(d => d.coverage);
    
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Generate forecast data
    return Array.from({ length: forecastPeriod }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() + i + 1);
      return {
        month: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
        forecast: Math.max(0, Math.min(100, slope * (i + 12) + intercept)),
        confidence: Math.max(0, Math.min(1, 1 - (i / forecastPeriod)))
      };
    });
  };

  // Filter training resources
  const getFilteredTrainingResources = (skill) => {
    const resources = generateTrainingResources(skill);
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(trainingSearchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(trainingSearchTerm.toLowerCase());
      const matchesPrice = resource.price.replace(/[^0-9.]/g, '') >= trainingFilters.priceRange[0] &&
                          resource.price.replace(/[^0-9.]/g, '') <= trainingFilters.priceRange[1];
      const matchesRating = resource.rating >= trainingFilters.rating;
      const matchesProvider = trainingFilters.provider === 'all' || resource.provider === trainingFilters.provider;
      const matchesDuration = trainingFilters.duration === 'all' || 
                            (trainingFilters.duration === 'short' && resource.duration.includes('hours')) ||
                            (trainingFilters.duration === 'medium' && resource.duration.includes('days')) ||
                            (trainingFilters.duration === 'long' && resource.duration.includes('months'));
      
      return matchesSearch && matchesPrice && matchesRating && matchesProvider && matchesDuration;
    });
  };

  // Advanced forecasting algorithms
  const generateAdvancedForecast = (dept, algorithm) => {
    const historicalData = generateHistoricalData(dept);
    const last12Months = historicalData.slice(-12);
    
    switch (algorithm) {
      case 'arima':
        // ARIMA model implementation
        const arimaForecast = generateArimaForecast(last12Months);
        return arimaForecast.map((forecast, i) => ({
          month: new Date(new Date().setMonth(new Date().getMonth() + i + 1))
            .toLocaleString('default', { month: 'short', year: 'numeric' }),
          forecast: Math.max(0, Math.min(100, forecast)),
          confidence: Math.max(0, Math.min(1, 1 - (i / forecastPeriod))),
          upperBound: Math.min(100, forecast * (1 + forecastConfidence)),
          lowerBound: Math.max(0, forecast * (1 - forecastConfidence))
        }));

      case 'prophet':
        // Prophet model implementation
        const prophetForecast = generateProphetForecast(last12Months);
        return prophetForecast.map((forecast, i) => ({
          month: new Date(new Date().setMonth(new Date().getMonth() + i + 1))
            .toLocaleString('default', { month: 'short', year: 'numeric' }),
          forecast: Math.max(0, Math.min(100, forecast)),
          confidence: Math.max(0, Math.min(1, 1 - (i / forecastPeriod))),
          upperBound: Math.min(100, forecast * (1 + forecastConfidence)),
          lowerBound: Math.max(0, forecast * (1 - forecastConfidence))
        }));

      case 'exponential':
        // Existing exponential smoothing
        return generateExponentialForecast(last12Months);

      case 'movingAverage':
        // Existing moving average
        return generateMovingAverageForecast(last12Months);

      default:
        // Linear regression (existing)
        return generatePerformanceForecast(dept);
    }
  };

  // ARIMA model implementation
  const generateArimaForecast = (data) => {
    // Simple ARIMA(1,1,1) implementation
    const values = data.map(d => d.coverage);
    const diff = values.slice(1).map((v, i) => v - values[i]);
    const ar1 = 0.7; // AR coefficient
    const ma1 = 0.3; // MA coefficient
    
    let forecast = values[values.length - 1];
    const forecasts = [];
    
    for (let i = 0; i < forecastPeriod; i++) {
      forecast = ar1 * forecast + ma1 * diff[diff.length - 1];
      forecasts.push(forecast);
    }
    
    return forecasts;
  };

  // Prophet model implementation
  const generateProphetForecast = (data) => {
    // Simple Prophet-like implementation with trend and seasonality
    const values = data.map(d => d.coverage);
    const trend = values.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const seasonality = values.slice(-12).reduce((a, b) => a + b, 0) / 12;
    
    let forecast = values[values.length - 1];
    const forecasts = [];
    
    for (let i = 0; i < forecastPeriod; i++) {
      forecast = forecast + trend + Math.sin(i * Math.PI / 6) * seasonality * 0.1;
      forecasts.push(forecast);
    }
    
    return forecasts;
  };

  // Generate benchmark data
  const generateBenchmarkData = () => {
    const industryAverages = {
      efficiency: 0.75,
      skillCoverage: 0.85,
      roleCoverage: 0.90,
      personnelRatio: 1.2,
      innovation: 0.65,
      adaptability: 0.70,
      collaboration: 0.80,
      productivity: 0.85
    };

    return departmentMetrics.map(metric => {
      const deptRoles = roles.filter(role => role.department === metric.name);
      const deptPersonnel = personnel.filter(person => person.department === metric.name);
      
      // Calculate additional metrics
      const innovation = calculateInnovationScore(deptRoles, deptPersonnel);
      const adaptability = calculateAdaptabilityScore(deptRoles, deptPersonnel);
      const collaboration = calculateCollaborationScore(deptRoles, deptPersonnel);
      const productivity = calculateProductivityScore(deptRoles, deptPersonnel);

      return {
        department: metric.name,
        efficiency: {
          current: metric.efficiency,
          benchmark: industryAverages.efficiency,
          difference: metric.efficiency - industryAverages.efficiency
        },
        skillCoverage: {
          current: calculateSkillGaps(metric.name).coverage / 100,
          benchmark: industryAverages.skillCoverage,
          difference: (calculateSkillGaps(metric.name).coverage / 100) - industryAverages.skillCoverage
        },
        roleCoverage: {
          current: calculateRoleCoverage(metric.name).reduce((acc, role) => acc + role.coverage, 0) / calculateRoleCoverage(metric.name).length,
          benchmark: industryAverages.roleCoverage,
          difference: (calculateRoleCoverage(metric.name).reduce((acc, role) => acc + role.coverage, 0) / calculateRoleCoverage(metric.name).length) - industryAverages.roleCoverage
        },
        personnelRatio: {
          current: metric.rolePersonnelRatio,
          benchmark: industryAverages.personnelRatio,
          difference: metric.rolePersonnelRatio - industryAverages.personnelRatio
        },
        innovation: {
          current: innovation,
          benchmark: industryAverages.innovation,
          difference: innovation - industryAverages.innovation
        },
        adaptability: {
          current: adaptability,
          benchmark: industryAverages.adaptability,
          difference: adaptability - industryAverages.adaptability
        },
        collaboration: {
          current: collaboration,
          benchmark: industryAverages.collaboration,
          difference: collaboration - industryAverages.collaboration
        },
        productivity: {
          current: productivity,
          benchmark: industryAverages.productivity,
          difference: productivity - industryAverages.productivity
        }
      };
    });
  };

  // Calculate additional metrics
  const calculateInnovationScore = (roles, personnel) => {
    const innovationRoles = roles.filter(role => role.type === 'Innovation').length;
    const innovationPersonnel = personnel.filter(person => 
      person.skills?.some(skill => skill.toLowerCase().includes('innovation'))
    ).length;
    return (innovationRoles + innovationPersonnel) / (roles.length + personnel.length);
  };

  const calculateAdaptabilityScore = (roles, personnel) => {
    const adaptablePersonnel = personnel.filter(person => 
      person.skills?.some(skill => 
        ['flexibility', 'adaptability', 'resilience'].includes(skill.toLowerCase())
      )
    ).length;
    return adaptablePersonnel / personnel.length;
  };

  const calculateCollaborationScore = (roles, personnel) => {
    const collaborativeRoles = roles.filter(role => 
      role.skills?.some(skill => 
        ['teamwork', 'collaboration', 'communication'].includes(skill.toLowerCase())
      )
    ).length;
    return collaborativeRoles / roles.length;
  };

  const calculateProductivityScore = (roles, personnel) => {
    const roleCoverage = calculateRoleCoverage(roles[0]?.department || '');
    const averageCoverage = roleCoverage.reduce((acc, role) => acc + role.coverage, 0) / roleCoverage.length;
    return averageCoverage / 100;
  };

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('analyticsSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setChartType(settings.chartType);
      setChartOptions(settings.chartOptions);
      setChartInteractions(settings.chartInteractions);
      setPerformanceWeights(settings.performanceWeights);
      setExportFormat(settings.exportFormat);
      setExportFields(settings.exportFields);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      chartType,
      chartOptions,
      chartInteractions,
      performanceWeights,
      exportFormat,
      exportFields
    };
    localStorage.setItem('analyticsSettings', JSON.stringify(settings));
    setSnackbarMessage('Settings saved successfully');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  // Alert generation function
  const generateAlerts = () => {
    const newAlerts = [];
    
    // Check for skill gaps
    departments.forEach(dept => {
      const skillGaps = calculateSkillGaps(dept);
      if (skillGaps.coverage < 70) {
        newAlerts.push({
          type: 'warning',
          department: dept,
          message: `Low skill coverage (${Math.round(skillGaps.coverage)}%)`,
          timestamp: new Date()
        });
      }
    });

    // Check for role coverage issues
    departments.forEach(dept => {
      const roleCoverage = calculateRoleCoverage(dept);
      const lowCoverageRoles = roleCoverage.filter(role => role.coverage < 80);
      if (lowCoverageRoles.length > 0) {
        newAlerts.push({
          type: 'error',
          department: dept,
          message: `${lowCoverageRoles.length} roles with low coverage`,
          timestamp: new Date()
        });
      }
    });

    // Check for efficiency changes
    departments.forEach(dept => {
      const historicalData = generateHistoricalData(dept);
      const currentEfficiency = historicalData[historicalData.length - 1].efficiency;
      const previousEfficiency = historicalData[historicalData.length - 2].efficiency;
      
      if (currentEfficiency < previousEfficiency * 0.9) {
        newAlerts.push({
          type: 'warning',
          department: dept,
          message: 'Significant efficiency drop detected',
          timestamp: new Date()
        });
      }
    });

    setAlerts(newAlerts);
  };

  // Run alert generation periodically
  useEffect(() => {
    generateAlerts();
    const interval = setInterval(generateAlerts, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [departments]);

  // Add correlation analysis function
  const analyzeCorrelations = () => {
    const metrics = ['efficiency', 'coverage', 'personnel', 'skills'];
    const matrix = [];
    
    metrics.forEach(metric1 => {
      metrics.forEach(metric2 => {
        if (metric1 !== metric2) {
          const correlation = calculateCorrelation(
            departmentMetrics.map(m => m[metric1]),
            departmentMetrics.map(m => m[metric2])
          );
          matrix.push({
            metric1,
            metric2,
            correlation
          });
        }
      });
    });
    
    setCorrelationMatrix(matrix);
  };

  // Add anomaly detection function
  const detectAnomalies = () => {
    const anomalies = [];
    
    departmentMetrics.forEach(metric => {
      const efficiencyZScore = calculateZScore(
        metric.efficiency,
        departmentMetrics.map(m => m.efficiency)
      );
      
      if (Math.abs(efficiencyZScore) > 2) {
        anomalies.push({
          department: metric.name,
          metric: 'Efficiency',
          description: `Significant deviation (${efficiencyZScore.toFixed(2)} standard deviations)`
        });
      }
      
      // Add more anomaly checks for other metrics
    });
    
    setAnomalies(anomalies);
  };

  // Add helper functions
  const calculateCorrelation = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    return (n * sumXY - sumX * sumY) / 
           Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  };

  const calculateZScore = (value, values) => {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    );
    return (value - mean) / stdDev;
  };

  // Run advanced analytics when component mounts
  useEffect(() => {
    analyzeCorrelations();
    detectAnomalies();
  }, [departmentMetrics]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(chartLayout);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChartLayout(items);
  };

  const saveCurrentLayout = () => {
    const newLayout = {
      id: Date.now().toString(),
      name: `Layout ${savedLayouts.length + 1}`,
      layout: chartLayout,
      timestamp: new Date()
    };
    setSavedLayouts([...savedLayouts, newLayout]);
    localStorage.setItem('savedLayouts', JSON.stringify([...savedLayouts, newLayout]));
  };

  const loadLayout = (layout) => {
    setChartLayout(layout.layout);
  };

  const handleShare = () => {
    // Implement sharing logic based on format
    switch (shareOptions.format) {
      case 'pdf':
        // Generate and share PDF
        break;
      case 'ppt':
        // Generate and share PowerPoint
        break;
      case 'excel':
        // Generate and share Excel
        break;
    }
    setShowShareDialog(false);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: 'Current User', // Replace with actual user
      text: newComment,
      timestamp: new Date(),
      chartId: selectedChartForComment
    };

    setComments([...comments, comment]);
    setNewComment('');
    localStorage.setItem('comments', JSON.stringify([...comments, comment]));
  };

  // Load saved layouts and comments on mount
  useEffect(() => {
    const savedLayoutsData = localStorage.getItem('savedLayouts');
    const savedComments = localStorage.getItem('comments');
    
    if (savedLayoutsData) {
      setSavedLayouts(JSON.parse(savedLayoutsData));
    }
    
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const addKPI = () => {
    const kpi = {
      id: Date.now().toString(),
      ...newKPI,
      currentValue: 0,
      progress: 0
    };
    
    setCustomKPIs([...customKPIs, kpi]);
    localStorage.setItem('customKPIs', JSON.stringify([...customKPIs, kpi]));
    setShowAddKPIDialog(false);
    setNewKPI({
      name: '',
      formula: '',
      target: '',
      unit: ''
    });
  };

  const editKPI = (index) => {
    // Implement KPI editing logic
  };

  const deleteKPI = (index) => {
    const newKPIs = customKPIs.filter((_, i) => i !== index);
    setCustomKPIs(newKPIs);
    localStorage.setItem('customKPIs', JSON.stringify(newKPIs));
  };

  const addGoal = () => {
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      progress: 0,
      created: new Date()
    };
    
    setGoals([...goals, goal]);
    localStorage.setItem('goals', JSON.stringify([...goals, goal]));
    setShowAddGoalDialog(false);
    setNewGoal({
      title: '',
      target: '',
      deadline: '',
      description: ''
    });
  };

  const editGoal = (index) => {
    // Implement goal editing logic
  };

  const deleteGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
    localStorage.setItem('goals', JSON.stringify(newGoals));
  };

  // Add to useEffect for loading saved data
  useEffect(() => {
    const savedKPIs = localStorage.getItem('customKPIs');
    const savedGoals = localStorage.getItem('goals');
    
    if (savedKPIs) {
      setCustomKPIs(JSON.parse(savedKPIs));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const addAnnotation = () => {
    const annotation = {
      id: Date.now().toString(),
      text: newAnnotation.text,
      type: newAnnotation.type,
      color: newAnnotation.color,
      chartId: selectedChartForAnnotation,
      timestamp: new Date(),
      user: 'Current User' // Replace with actual user
    };
    
    setChartAnnotations([...chartAnnotations, annotation]);
    localStorage.setItem('chartAnnotations', JSON.stringify([...chartAnnotations, annotation]));
    setShowAnnotationDialog(false);
    setNewAnnotation({
      type: 'text',
      text: '',
      x: 0,
      y: 0,
      color: '#ff0000'
    });
  };

  const addActionItem = () => {
    const actionItem = {
      id: Date.now().toString(),
      ...newActionItem,
      status: 'pending',
      created: new Date(),
      createdBy: 'Current User' // Replace with actual user
    };
    
    setActionItems([...actionItems, actionItem]);
    localStorage.setItem('actionItems', JSON.stringify([...actionItems, actionItem]));
    setShowActionItemDialog(false);
    setNewActionItem({
      title: '',
      description: '',
      assignee: '',
      dueDate: ''
    });
  };

  // Add to useEffect for loading saved data
  useEffect(() => {
    const savedAnnotations = localStorage.getItem('chartAnnotations');
    const savedActionItems = localStorage.getItem('actionItems');
    
    if (savedAnnotations) {
      setChartAnnotations(JSON.parse(savedAnnotations));
    }
    if (savedActionItems) {
      setActionItems(JSON.parse(savedActionItems));
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('chartTheme');
    if (savedTheme) {
      setChartTheme(JSON.parse(savedTheme));
    }
  }, []);

  const renderAnnotations = () => {
    return chartAnnotations.map(annotation => {
      switch (annotation.type) {
        case 'text':
          return (
            <text
              key={annotation.id}
              x={annotation.x}
              y={annotation.y}
              fill={annotation.color}
              fontSize="14"
            >
              {annotation.text}
            </text>
          );
        case 'arrow':
          return (
            <g key={annotation.id}>
              <line
                x1={annotation.x}
                y1={annotation.y}
                x2={annotation.x + 50}
                y2={annotation.y - 50}
                stroke={annotation.color}
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={annotation.color}
                  />
                </marker>
              </defs>
            </g>
          );
        case 'highlight':
          return (
            <rect
              key={annotation.id}
              x={annotation.x}
              y={annotation.y}
              width="100"
              height="50"
              fill={annotation.color}
              fillOpacity="0.2"
              stroke={annotation.color}
              strokeWidth="1"
            />
          );
        default:
          return null;
      }
    });
  };

  // Add export options dialog
  <Dialog
    open={showExportOptions}
    onClose={() => setShowExportOptions(false)}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>Export Options</DialogTitle>
    <DialogContent>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Export Format</InputLabel>
          <Select
            value={exportFormat}
            label="Export Format"
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Select Data to Export
            </Typography>
            <Stack spacing={2}>
              {Object.entries(exportFields).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      checked={value}
                      onChange={(e) => setExportFields(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                    />
                  }
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </Stack>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="1m">Last Month</MenuItem>
                <MenuItem value="3m">Last 3 Months</MenuItem>
                <MenuItem value="6m">Last 6 Months</MenuItem>
                <MenuItem value="1y">Last Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleExportData(viewMode, exportFormat)} startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button onClick={() => setShowExportOptions(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Alerts Dialog */}
      <Dialog
        open={showAlerts}
        onClose={() => setShowAlerts(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Department Alerts</DialogTitle>
        <DialogContent>
          <List>
            {alerts.map((alert, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {alert.type === 'error' ? (
                        <ErrorIcon color="error" />
                      ) : (
                        <WarningIcon color="warning" />
                      )}
                      <Typography variant="subtitle1">
                        {alert.department}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
            {alerts.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No active alerts"
                  secondary="All departments are performing within expected ranges"
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlerts(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Custom Report Dialog */}
      <Dialog
        open={showCustomReportDialog}
        onClose={() => setShowCustomReportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Custom Report</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Report Name"
              value={customReportConfig.name}
              onChange={(e) => setCustomReportConfig(prev => ({
                ...prev,
                name: e.target.value
              }))}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Select Metrics
            </Typography>
            <Stack spacing={2}>
              {Object.entries(exportFields).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      checked={customReportConfig.metrics.includes(key)}
                      onChange={(e) => {
                        const newMetrics = e.target.checked
                          ? [...customReportConfig.metrics, key]
                          : customReportConfig.metrics.filter(m => m !== key);
                        setCustomReportConfig(prev => ({
                          ...prev,
                          metrics: newMetrics
                        }));
                      }}
                    />
                  }
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </Stack>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Schedule Report
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={customReportConfig.schedule?.frequency || ''}
                label="Frequency"
                onChange={(e) => setCustomReportConfig(prev => ({
                  ...prev,
                  schedule: {
                    ...prev.schedule,
                    frequency: e.target.value
                  }
                }))}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => saveCustomReport()}>Save Report</Button>
          <Button onClick={() => setShowCustomReportDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Advanced Analytics Dialog */}
      <Dialog
        open={showAdvancedAnalytics}
        onClose={() => setShowAdvancedAnalytics(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Advanced Analytics</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Correlation Analysis
                    </Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <HeatmapChart
                          data={correlationMatrix}
                          xDataKey="metric1"
                          yDataKey="metric2"
                          valueDataKey="correlation"
                        />
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Anomaly Detection
                    </Typography>
                    <List>
                      {anomalies.map((anomaly, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={anomaly.metric}
                            secondary={`${anomaly.department}: ${anomaly.description}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAdvancedAnalytics(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Chart Customization Dialog */}
      <Dialog
        open={showChartCustomization}
        onClose={() => setShowChartCustomization(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Customize Charts</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Chart Layout
                    </Typography>
                    <Box sx={{ height: 300, border: '1px dashed grey', p: 2 }}>
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="chartLayout">
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {chartLayout.map((chart, index) => (
                                <Draggable
                                  key={chart.id}
                                  draggableId={chart.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{
                                        p: 1,
                                        mb: 1,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1
                                      }}
                                    >
                                      {chart.title}
                                    </Box>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Box>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Saved Layouts
                    </Typography>
                    <List>
                      {savedLayouts.map((layout, index) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => loadLayout(layout)}
                        >
                          <ListItemText
                            primary={layout.name}
                            secondary={new Date(layout.timestamp).toLocaleString()}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="outlined"
                      onClick={saveCurrentLayout}
                      startIcon={<SaveIcon />}
                      sx={{ mt: 2 }}
                    >
                      Save Current Layout
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChartCustomization(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog
        open={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Share Dashboard</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Export Format</InputLabel>
              <Select
                value={shareOptions.format}
                label="Export Format"
                onChange={(e) => setShareOptions(prev => ({
                  ...prev,
                  format: e.target.value
                }))}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="ppt">PowerPoint</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Recipients"
              placeholder="Enter email addresses"
              value={shareOptions.recipients.join(', ')}
              onChange={(e) => setShareOptions(prev => ({
                ...prev,
                recipients: e.target.value.split(',').map(email => email.trim())
              }))}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              value={shareOptions.message}
              onChange={(e) => setShareOptions(prev => ({
                ...prev,
                message: e.target.value
              }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={() => setShowShareDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Comments Panel */}
      <Paper
        sx={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: 300,
          transform: showComments ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Comments</Typography>
            <IconButton onClick={() => setShowComments(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={comment.user}
                  secondary={
                    <Box>
                      <Typography variant="body2">{comment.text}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              onClick={addComment}
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* KPI Management Dialog */}
      <Dialog
        open={showKPIDialog}
        onClose={() => setShowKPIDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage KPIs</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddKPIDialog(true)}
              startIcon={<AddIcon />}
              sx={{ mb: 2 }}
            >
              Add New KPI
            </Button>
            <List>
              {customKPIs.map((kpi, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={kpi.name}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Formula: {kpi.formula}
                        </Typography>
                        <Typography variant="body2">
                          Target: {kpi.target} {kpi.unit}
                        </Typography>
                        <Typography variant="body2">
                          Current Value: {kpi.currentValue} {kpi.unit}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton onClick={() => editKPI(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteKPI(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowKPIDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add KPI Dialog */}
      <Dialog
        open={showAddKPIDialog}
        onClose={() => setShowAddKPIDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New KPI</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="KPI Name"
              value={newKPI.name}
              onChange={(e) => setNewKPI(prev => ({
                ...prev,
                name: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Formula"
              value={newKPI.formula}
              onChange={(e) => setNewKPI(prev => ({
                ...prev,
                formula: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Target"
              type="number"
              value={newKPI.target}
              onChange={(e) => setNewKPI(prev => ({
                ...prev,
                target: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Unit"
              value={newKPI.unit}
              onChange={(e) => setNewKPI(prev => ({
                ...prev,
                unit: e.target.value
              }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addKPI}>Add KPI</Button>
          <Button onClick={() => setShowAddKPIDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Goal Management Dialog */}
      <Dialog
        open={showGoalDialog}
        onClose={() => setShowGoalDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Goals</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddGoalDialog(true)}
              startIcon={<AddIcon />}
              sx={{ mb: 2 }}
            >
              Add New Goal
            </Button>
            <List>
              {goals.map((goal, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={goal.title}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Target: {goal.target}
                        </Typography>
                        <Typography variant="body2">
                          Progress: {goal.progress}%
                        </Typography>
                        <Typography variant="body2">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ width: 100, mr: 2 }}
                  />
                  <IconButton onClick={() => editGoal(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteGoal(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGoalDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Goal Dialog */}
      <Dialog
        open={showAddGoalDialog}
        onClose={() => setShowAddGoalDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Goal Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal(prev => ({
                ...prev,
                title: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Target"
              value={newGoal.target}
              onChange={(e) => setNewGoal(prev => ({
                ...prev,
                target: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Deadline"
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal(prev => ({
                ...prev,
                deadline: e.target.value
              }))}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newGoal.description}
              onChange={(e) => setNewGoal(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addGoal}>Add Goal</Button>
          <Button onClick={() => setShowAddGoalDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Chart Annotation Dialog */}
      <Dialog
        open={showAnnotationDialog}
        onClose={() => setShowAnnotationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Chart Annotation</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Annotation Type</InputLabel>
              <Select
                value={newAnnotation.type}
                onChange={(e) => setNewAnnotation(prev => ({
                  ...prev,
                  type: e.target.value
                }))}
                label="Annotation Type"
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="arrow">Arrow</MenuItem>
                <MenuItem value="highlight">Highlight</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Annotation Text"
              value={newAnnotation.text}
              onChange={(e) => setNewAnnotation(prev => ({
                ...prev,
                text: e.target.value
              }))}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="X Position"
                  type="number"
                  value={newAnnotation.x}
                  onChange={(e) => setNewAnnotation(prev => ({
                    ...prev,
                    x: parseFloat(e.target.value)
                  }))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Y Position"
                  type="number"
                  value={newAnnotation.y}
                  onChange={(e) => setNewAnnotation(prev => ({
                    ...prev,
                    y: parseFloat(e.target.value)
                  }))}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Color"
              type="color"
              value={newAnnotation.color}
              onChange={(e) => setNewAnnotation(prev => ({
                ...prev,
                color: e.target.value
              }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: newAnnotation.color,
                        borderRadius: 1
                      }}
                    />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setChartAnnotations(prev => [...prev, { ...newAnnotation, id: Date.now() }]);
            localStorage.setItem('chartAnnotations', JSON.stringify([...chartAnnotations, { ...newAnnotation, id: Date.now() }]));
            setNewAnnotation({
              type: 'text',
              text: '',
              x: 0,
              y: 0,
              color: '#ff0000'
            });
            setShowAnnotationDialog(false);
          }}>
            Add Annotation
          </Button>
          <Button onClick={() => setShowAnnotationDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Action Items Dialog */}
      <Dialog
        open={showActionItemDialog}
        onClose={() => setShowActionItemDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Action Item</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={newActionItem.title}
              onChange={(e) => setNewActionItem(prev => ({
                ...prev,
                title: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newActionItem.description}
              onChange={(e) => setNewActionItem(prev => ({
                ...prev,
                description: e.target.value
              }))}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Assignee</InputLabel>
              <Select
                value={newActionItem.assignee}
                label="Assignee"
                onChange={(e) => setNewActionItem(prev => ({
                  ...prev,
                  assignee: e.target.value
                }))}
              >
                {personnel.map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {person.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={newActionItem.dueDate}
              onChange={(e) => setNewActionItem(prev => ({
                ...prev,
                dueDate: e.target.value
              }))}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addActionItem}>Create Action Item</Button>
          <Button onClick={() => setShowActionItemDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Action Items List */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Action Items
        </Typography>
        <List>
          {actionItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.title}
                secondary={
                  <Box>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Assigned to: {personnel.find(p => p.id === item.assignee)?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
              />
              <Chip
                label={item.status}
                color={item.status === 'completed' ? 'success' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chart Theme Dialog */}
      <Dialog
        open={showThemeDialog}
        onClose={() => setShowThemeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Customize Chart Theme</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Primary Colors
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Primary Color"
                  type="color"
                  value={chartTheme.primary}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    primary: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.primary,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Secondary Color"
                  type="color"
                  value={chartTheme.secondary}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    secondary: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.secondary,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom>
              Background and Text
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Background Color"
                  type="color"
                  value={chartTheme.background}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    background: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.background,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Text Color"
                  type="color"
                  value={chartTheme.text}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    text: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.text,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom>
              Additional Colors
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Grid Color"
                  type="color"
                  value={chartTheme.grid}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    grid: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.grid,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Tooltip Color"
                  type="color"
                  value={chartTheme.tooltip}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    tooltip: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.tooltip,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Legend Color"
                  type="color"
                  value={chartTheme.legend}
                  onChange={(e) => setChartTheme(prev => ({
                    ...prev,
                    legend: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: chartTheme.legend,
                            borderRadius: 1
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            localStorage.setItem('chartTheme', JSON.stringify(chartTheme));
            setShowThemeDialog(false);
          }}>
            Save Theme
          </Button>
          <Button onClick={() => setShowThemeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Advanced Analytics Dialog */}
      <Dialog
        open={showAdvancedAnalytics}
        onClose={() => setShowAdvancedAnalytics(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Advanced Analytics</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Tabs
              value={selectedAnalysis}
              onChange={(e, newValue) => setSelectedAnalysis(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Statistical Analysis" />
              <Tab label="Machine Learning Insights" />
              <Tab label="Anomaly Detection" />
            </Tabs>

            {selectedAnalysis === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Correlation Analysis
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>X Variable</InputLabel>
                      <Select
                        value={statisticalAnalysis.xVariable}
                        onChange={(e) => setStatisticalAnalysis(prev => ({
                          ...prev,
                          xVariable: e.target.value
                        }))}
                      >
                        {Object.keys(currentData[0] || {}).map(key => (
                          <MenuItem key={key} value={key}>{key}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Y Variable</InputLabel>
                      <Select
                        value={statisticalAnalysis.yVariable}
                        onChange={(e) => setStatisticalAnalysis(prev => ({
                          ...prev,
                          yVariable: e.target.value
                        }))}
                      >
                        {Object.keys(currentData[0] || {}).map(key => (
                          <MenuItem key={key} value={key}>{key}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={() => {
                    const correlation = calculateCorrelation(
                      currentData,
                      statisticalAnalysis.xVariable,
                      statisticalAnalysis.yVariable
                    );
                    setStatisticalAnalysis(prev => ({
                      ...prev,
                      correlation
                    }));
                  }}
                  sx={{ mt: 2 }}
                >
                  Calculate Correlation
                </Button>
              </Box>
            )}

            {selectedAnalysis === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Machine Learning Insights
                </Typography>
                <List>
                  {mlInsights.map((insight, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={insight.title}
                        secondary={insight.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {selectedAnalysis === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Anomaly Detection
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Variable</InputLabel>
                  <Select
                    value={statisticalAnalysis.anomalyVariable}
                    onChange={(e) => setStatisticalAnalysis(prev => ({
                      ...prev,
                      anomalyVariable: e.target.value
                    }))}
                  >
                    {Object.keys(currentData[0] || {}).map(key => (
                      <MenuItem key={key} value={key}>{key}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => {
                    const anomalies = detectAnomalies(
                      currentData,
                      statisticalAnalysis.anomalyVariable
                    );
                    setStatisticalAnalysis(prev => ({
                      ...prev,
                      anomalies
                    }));
                  }}
                >
                  Detect Anomalies
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAdvancedAnalytics(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add shared dashboard dialog */}
      <Dialog
        open={showShareDashboardDialog}
        onClose={() => setShowShareDashboardDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Share Dashboard</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Dashboard Name"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Permissions
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Viewers</InputLabel>
                  <Select
                    multiple
                    value={sharedDashboardSettings.viewers}
                    onChange={(e) => setSharedDashboardSettings(prev => ({
                      ...prev,
                      viewers: e.target.value
                    }))}
                  >
                    {personnel.map((person) => (
                      <MenuItem key={person.id} value={person.id}>
                        {person.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Editors</InputLabel>
                  <Select
                    multiple
                    value={sharedDashboardSettings.editors}
                    onChange={(e) => setSharedDashboardSettings(prev => ({
                      ...prev,
                      editors: e.target.value
                    }))}
                  >
                    {personnel.map((person) => (
                      <MenuItem key={person.id} value={person.id}>
                        {person.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Message"
              multiline
              rows={3}
              value={dashboardMessage}
              onChange={(e) => setDashboardMessage(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            const newDashboard = {
              id: Date.now().toString(),
              name: newDashboardName,
              settings: sharedDashboardSettings,
              message: dashboardMessage,
              created: new Date(),
              createdBy: 'Current User' // Replace with actual user
            };
            setSharedDashboards([...sharedDashboards, newDashboard]);
            localStorage.setItem('sharedDashboards', JSON.stringify([...sharedDashboards, newDashboard]));
            setShowShareDashboardDialog(false);
            setNewDashboardName('');
            setDashboardMessage('');
            setSharedDashboardSettings({
              permissions: {},
              viewers: [],
              editors: []
            });
          }}>
            Share Dashboard
          </Button>
          <Button onClick={() => setShowShareDashboardDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add TeamChat component */}
      <TeamChat />

      {/* Add team chat button to toolbar */}
      <IconButton onClick={() => setShowTeamChat(true)}>
        <ChatIcon />
      </IconButton>

      {/* Add performance metrics button to toolbar */}
      <IconButton onClick={() => setShowPerformanceMetrics(true)}>
        <SpeedIcon />
      </IconButton>

      {/* Add security settings button to toolbar */}
      <IconButton onClick={() => setShowSecuritySettings(true)}>
        <SecurityIcon />
      </IconButton>

      {/* Add audit log button to toolbar */}
      <IconButton onClick={() => setShowAuditLog(true)}>
        <HistoryIcon />
      </IconButton>

      {/* Add integration button to toolbar */}
      <IconButton onClick={() => setShowIntegrationDialog(true)}>
        <ExtensionIcon />
      </IconButton>

      {/* Add webhook button to toolbar */}
      <IconButton onClick={() => setShowWebhookDialog(true)}>
        <WebhookIcon />
      </IconButton>

      {/* Add version control functions */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setShowVersionHistory(true)}
          startIcon={<HistoryIcon />}
        >
          Version History
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => setShowCollaborationSettings(true)}
          startIcon={<GroupIcon />}
        >
          Collaboration Settings
        </Button>
        
        <Button
          variant="outlined"
          onClick={saveVersion}
          startIcon={<SaveIcon />}
        >
          Save Version
        </Button>
      </Box>

      {/* Add real-time collaboration indicators */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
        {onlineUsers.map((user) => (
          <Tooltip key={user.id} title={user.name}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: user.color,
                border: '2px solid white'
              }}
            >
              {user.name[0]}
            </Avatar>
          </Tooltip>
        ))}
      </Box>

      {/* Add real-time collaboration functions */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1000
        }}
      >
        {Object.entries(userCursors).map(([userId, cursor]) => {
          const user = activeUsers.find(u => u.id === userId);
          if (!user) return null;
          
          return (
            <Box
              key={userId}
              sx={{
                position: 'absolute',
                left: cursor.position.x,
                top: cursor.position.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: cursor.color,
                  opacity: 0.5,
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'background.paper',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    boxShadow: 1
                  }}
                >
                  {user.name}
                </Box>
              </Box>
            </Box>
          );
        })}
        
        {Object.entries(userSelections).map(([userId, selection]) => {
          const user = activeUsers.find(u => u.id === userId);
          if (!user) return null;
          
          return (
            <Box
              key={userId}
              sx={{
                position: 'absolute',
                left: selection.x,
                top: selection.y,
                width: selection.width,
                height: selection.height,
                bgcolor: selection.color,
                opacity: 0.1,
                border: `2px solid ${selection.color}`,
                pointerEvents: 'none'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: 0,
                  bgcolor: 'background.paper',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  boxShadow: 1
                }}
              >
                {user.name} is selecting
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Add collaboration toolbar */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setShowUserActivity(true)}
          startIcon={<GroupIcon />}
        >
          User Activity
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => setShowCollaborationSettings(true)}
          startIcon={<SettingsIcon />}
        >
          Collaboration Settings
        </Button>
      </Box>

      {/* Add user presence indicators */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
        {activeUsers.map((user) => (
          <Tooltip
            key={user.id}
            title={
              <Box>
                <Typography variant="subtitle2">{user.name}</Typography>
                <Typography variant="caption">
                  {userActivity[user.id]?.action || 'Viewing'}
                </Typography>
              </Box>
            }
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: user.color,
                border: '2px solid white',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              {user.name[0]}
            </Avatar>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

// Add team chat component
const TeamChat = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: 300,
        transform: showTeamChat ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Team Chat</Typography>
          <IconButton onClick={() => setShowTeamChat(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Online Users
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {onlineUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                color={userPresence[user.id]?.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          <List>
            {chatMessages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2">{message.user}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  }
                  secondary={message.text}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (!newMessage.trim()) return;
              const message = {
                id: Date.now().toString(),
                user: 'Current User', // Replace with actual user
                text: newMessage,
                timestamp: new Date()
              };
              setChatMessages([...chatMessages, message]);
              setNewMessage('');
              localStorage.setItem('chatMessages', JSON.stringify([...chatMessages, message]));
            }}
            disabled={!newMessage.trim()}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

// Add performance monitoring dialog
<Dialog
  open={showPerformanceMetrics}
  onClose={() => setShowPerformanceMetrics(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>Performance Metrics</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Load Time</Typography>
          <Typography variant="body1">
            {performanceMetrics.loadTime.toFixed(2)}ms
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Render Time</Typography>
          <Typography variant="body1">
            {performanceMetrics.renderTime.toFixed(2)}ms
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Memory Usage</Typography>
          <Typography variant="body1">
            {(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Network Requests</Typography>
          <Typography variant="body1">
            {performanceMetrics.networkRequests}
          </Typography>
        </Grid>
      </Grid>
      
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        Cache Status
      </Typography>
      <List>
        {Object.entries(cachedData).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={key}
              secondary={`Expires: ${new Date(cacheExpiry[key]).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => {
      setCachedData({});
      setCacheExpiry({});
    }}>
      Clear Cache
    </Button>
    <Button onClick={() => setShowPerformanceMetrics(false)}>Close</Button>
  </DialogActions>
</Dialog>

// Add lazy loading for charts
const LazyChart = ({ type, data, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};

// Add data caching
const getCachedData = (key) => {
  const cached = cachedData[key];
  const expiry = cacheExpiry[key];
  
  if (cached && expiry && new Date() < new Date(expiry)) {
    return cached;
  }
  
  return null;
};

const setCachedDataWithExpiry = (key, data, ttl = 5 * 60 * 1000) => {
  setCachedData(prev => ({
    ...prev,
    [key]: data
  }));
  setCacheExpiry(prev => ({
    ...prev,
    [key]: new Date(Date.now() + ttl)
  }));
};

// Add audit logging
const logAuditEvent = (event) => {
  const logEntry = {
    id: Date.now().toString(),
    timestamp: new Date(),
    user: 'Current User', // Replace with actual user
    action: event.action,
    details: event.details,
    ip: '127.0.0.1' // Replace with actual IP
  };
  
  setAuditLogs(prev => [...prev, logEntry]);
  localStorage.setItem('auditLogs', JSON.stringify([...auditLogs, logEntry]));
};

// Add role-based access control
const checkPermission = (permission) => {
  return userRoles.some(role => role.permissions.includes(permission));
};

// Add security settings dialog
<Dialog
  open={showSecuritySettings}
  onClose={() => setShowSecuritySettings(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Security Settings</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={securitySettings.encryption}
                onChange={(e) => {
                  setSecuritySettings(prev => ({
                    ...prev,
                    encryption: e.target.checked
                  }));
                  logAuditEvent({
                    action: 'Security Setting Changed',
                    details: `Encryption ${e.target.checked ? 'enabled' : 'disabled'}`
                  });
                }}
              />
            }
            label="Enable Data Encryption"
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={securitySettings.requireMFA}
                onChange={(e) => {
                  setSecuritySettings(prev => ({
                    ...prev,
                    requireMFA: e.target.checked
                  }));
                  logAuditEvent({
                    action: 'Security Setting Changed',
                    details: `MFA ${e.target.checked ? 'enabled' : 'disabled'}`
                  });
                }}
              />
            }
            label="Require Multi-Factor Authentication"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Session Timeout (minutes)
          </Typography>
          <Slider
            value={securitySettings.sessionTimeout}
            onChange={(e, value) => {
              setSecuritySettings(prev => ({
                ...prev,
                sessionTimeout: value
              }));
              logAuditEvent({
                action: 'Security Setting Changed',
                details: `Session timeout set to ${value} minutes`
              });
            }}
            min={5}
            max={120}
            step={5}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Allowed IP Addresses
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              placeholder="Enter IP address"
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (newIP && !securitySettings.allowedIPs.includes(newIP)) {
                  setSecuritySettings(prev => ({
                    ...prev,
                    allowedIPs: [...prev.allowedIPs, newIP]
                  }));
                  setNewIP('');
                  logAuditEvent({
                    action: 'Security Setting Changed',
                    details: `Added allowed IP: ${newIP}`
                  });
                }
              }}
            >
              Add
            </Button>
          </Stack>
          <List>
            {securitySettings.allowedIPs.map((ip, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSecuritySettings(prev => ({
                        ...prev,
                        allowedIPs: prev.allowedIPs.filter((_, i) => i !== index)
                      }));
                      logAuditEvent({
                        action: 'Security Setting Changed',
                        details: `Removed allowed IP: ${ip}`
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={ip} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => {
      localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
      setShowSecuritySettings(false);
    }}>
      Save Settings
    </Button>
    <Button onClick={() => setShowSecuritySettings(false)}>Cancel</Button>
  </DialogActions>
</Dialog>

{/* Add audit log dialog */}
<Dialog
  open={showAuditLog}
  onClose={() => setShowAuditLog(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Audit Log</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>IP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowAuditLog(false)}>Close</Button>
  </DialogActions>
</Dialog>

// Add integration dialog
<Dialog
  open={showIntegrationDialog}
  onClose={() => setShowIntegrationDialog(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Add Integration</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Integration Type</InputLabel>
        <Select
          value={newIntegration.type}
          onChange={(e) => setNewIntegration(prev => ({
            ...prev,
            type: e.target.value
          }))}
        >
          <MenuItem value="jira">Jira</MenuItem>
          <MenuItem value="slack">Slack</MenuItem>
          <MenuItem value="github">GitHub</MenuItem>
          <MenuItem value="trello">Trello</MenuItem>
          <MenuItem value="custom">Custom API</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Integration Name"
        value={newIntegration.name}
        onChange={(e) => setNewIntegration(prev => ({
          ...prev,
          name: e.target.value
        }))}
        sx={{ mb: 2 }}
      />

      {newIntegration.type === 'jira' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Jira URL"
              value={newIntegration.config.url || ''}
              onChange={(e) => setNewIntegration(prev => ({
                ...prev,
                config: {
                  ...prev.config,
                  url: e.target.value
                }
              }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="API Token"
              type="password"
              value={newIntegration.config.token || ''}
              onChange={(e) => setNewIntegration(prev => ({
                ...prev,
                config: {
                  ...prev.config,
                  token: e.target.value
                }
              }))}
            />
          </Grid>
        </Grid>
      )}

      {newIntegration.type === 'slack' && (
        <TextField
          fullWidth
          label="Webhook URL"
          value={newIntegration.config.webhookUrl || ''}
          onChange={(e) => setNewIntegration(prev => ({
            ...prev,
            config: {
              ...prev.config,
              webhookUrl: e.target.value
            }
          }))}
        />
      )}

      {newIntegration.type === 'custom' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="API Endpoint"
              value={newIntegration.config.endpoint || ''}
              onChange={(e) => setNewIntegration(prev => ({
                ...prev,
                config: {
                  ...prev.config,
                  endpoint: e.target.value
                }
              }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="API Key"
              type="password"
              value={newIntegration.config.apiKey || ''}
              onChange={(e) => setNewIntegration(prev => ({
                ...prev,
                config: {
                  ...prev.config,
                  apiKey: e.target.value
                }
              }))}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={addIntegration}>Add Integration</Button>
    <Button onClick={() => setShowIntegrationDialog(false)}>Cancel</Button>
  </DialogActions>
</Dialog>

// Add webhook dialog
<Dialog
  open={showWebhookDialog}
  onClose={() => setShowWebhookDialog(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Add Webhook</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Webhook URL"
        value={newWebhook.url}
        onChange={(e) => setNewWebhook(prev => ({
          ...prev,
          url: e.target.value
        }))}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom>
        Events to Trigger
      </Typography>
      <Stack spacing={2}>
        {['data_updated', 'chart_created', 'report_generated', 'alert_triggered'].map((event) => (
          <FormControlLabel
            key={event}
            control={
              <Checkbox
                checked={newWebhook.events.includes(event)}
                onChange={(e) => {
                  const newEvents = e.target.checked
                    ? [...newWebhook.events, event]
                    : newWebhook.events.filter(e => e !== event);
                  setNewWebhook(prev => ({
                    ...prev,
                    events: newEvents
                  }));
                }}
              />
            }
            label={event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          />
        ))}
      </Stack>

      <TextField
        fullWidth
        label="Secret Key"
        type="password"
        value={newWebhook.secret}
        onChange={(e) => setNewWebhook(prev => ({
          ...prev,
          secret: e.target.value
        }))}
        sx={{ mt: 2 }}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={addWebhook}>Add Webhook</Button>
    <Button onClick={() => setShowWebhookDialog(false)}>Cancel</Button>
  </DialogActions>
</Dialog>

// Add integration management section
<Paper sx={{ p: 2, mb: 2 }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="h6">Integrations</Typography>
    <Button
      variant="outlined"
      onClick={() => setShowIntegrationDialog(true)}
      startIcon={<AddIcon />}
    >
      Add Integration
    </Button>
  </Box>
  
  <Grid container spacing={2}>
    {integrations.map((integration) => (
      <Grid item xs={12} md={6} key={integration.id}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">{integration.name}</Typography>
              <Chip
                label={integration.status}
                color={integration.status === 'active' ? 'success' : 'error'}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Type: {integration.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Sync: {new Date(integration.lastSync).toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              // Implement sync logic
              logAuditEvent({
                action: 'Integration Sync',
                details: `Synced ${integration.type} integration: ${integration.name}`
              });
            }}>
              Sync Now
            </Button>
            <Button size="small" color="error" onClick={() => {
              setIntegrations(integrations.filter(i => i.id !== integration.id));
              localStorage.setItem('integrations', JSON.stringify(integrations.filter(i => i.id !== integration.id)));
              logAuditEvent({
                action: 'Integration Removed',
                details: `Removed ${integration.type} integration: ${integration.name}`
              });
            }}>
              Remove
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Paper>

// Add webhook management section
<Paper sx={{ p: 2, mb: 2 }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="h6">Webhooks</Typography>
    <Button
      variant="outlined"
      onClick={() => setShowWebhookDialog(true)}
      startIcon={<AddIcon />}
    >
      Add Webhook
    </Button>
  </Box>
  
  <Grid container spacing={2}>
    {webhooks.map((webhook) => (
      <Grid item xs={12} md={6} key={webhook.id}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" noWrap>
                {webhook.url}
              </Typography>
              <Chip
                label={webhook.status}
                color={webhook.status === 'active' ? 'success' : 'error'}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Events: {webhook.events.join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Triggered: {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              // Implement test webhook logic
              logAuditEvent({
                action: 'Webhook Test',
                details: `Tested webhook: ${webhook.url}`
              });
            }}>
              Test Webhook
            </Button>
            <Button size="small" color="error" onClick={() => {
              setWebhooks(webhooks.filter(w => w.id !== webhook.id));
              localStorage.setItem('webhooks', JSON.stringify(webhooks.filter(w => w.id !== webhook.id)));
              logAuditEvent({
                action: 'Webhook Removed',
                details: `Removed webhook: ${webhook.url}`
              });
            }}>
              Remove
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Paper>

// Add version history dialog
<Dialog
  open={showVersionHistory}
  onClose={() => setShowVersionHistory(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Version History</DialogTitle>
  <DialogContent>
    <Box sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell>
                  {new Date(version.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{version.author}</TableCell>
                <TableCell>{version.description}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => restoreVersion(version)}
                    disabled={currentVersion?.id === version.id}
                  >
                    Restore
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowVersionHistory(false)}>Close</Button>
  </DialogActions>
</Dialog>

{/* Add collaboration settings dialog */}
<Dialog