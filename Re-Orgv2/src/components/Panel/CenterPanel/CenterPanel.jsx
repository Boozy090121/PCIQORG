import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, Paper, Button, IconButton, Tooltip, Badge, 
  Typography, Divider
} from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  FitScreen as FitScreenIcon,
  Fullscreen as FullscreenIcon,
  Add as AddIcon,
  Tune as TuneIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Save as SaveIcon,
  FolderOpen as FolderOpenIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import { selectOrgChartNodes, selectOrgChartEdges, updateNode, setOrgChart } from '../../../features/Organization/orgChartSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { selectCurrentPhase } from '../../../features/Organization/phaseSlice';
import { OrgChartContent } from './OrgChartContent';
import VisualizationOptions from '../../UI/Visualization/VisualizationOptions';
import SearchFilter from '../../UI/SearchFilter/SearchFilter';
import { useChartControls } from './hooks/useChartControls';
import { OrgNodeCreator } from './OrgNodeCreator';
import { DragDropContext } from 'react-beautiful-dnd';
import { OrgChart } from './OrgChart';
import { handlePersonnelDrop } from './utils/dragDropHandlers';
import PersonnelMatchingSuggestions from './PersonnelMatchingSuggestions';
import '../../../styles/shared/drag-drop-styles.css';
import OrgChartSaveDialog from './OrgChartSaveDialog';
import OrgChartLayoutDialog from './OrgChartLayoutDialog';

export const CenterPanel = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const currentPhase = useSelector(selectCurrentPhase);
  const orgChart = {
    nodes: useSelector(selectOrgChartNodes),
    connections: useSelector(selectOrgChartEdges)
  };

  const [isNodeCreatorOpen, setIsNodeCreatorOpen] = useState(false);
  const [isVisualizationOptionsOpen, setIsVisualizationOptionsOpen] = useState(false);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visualizationOptions, setVisualizationOptions] = useState({
    showRoles: true,
    showPersonnel: true,
    showVacancies: true,
    layout: 'vertical'
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [layoutDialogOpen, setLayoutDialogOpen] = useState(false);
  const [currentChartId, setCurrentChartId] = useState(null);

  const {
    zoom,
    handleZoomIn,
    handleZoomOut,
    handleFitScreen,
    handleFullscreen
  } = useChartControls();

  const handleAddNodeClick = () => {
    setIsNodeCreatorOpen(true);
  };

  const handleNodeCreatorClose = () => {
    setIsNodeCreatorOpen(false);
  };

  const handleVisualizationOptionsOpen = () => {
    setIsVisualizationOptionsOpen(true);
  };

  const handleVisualizationOptionsClose = () => {
    setIsVisualizationOptionsOpen(false);
  };

  const handleSearchFilterOpen = () => {
    setIsSearchFilterOpen(true);
  };

  const handleSearchFilterClose = () => {
    setIsSearchFilterOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleVisualizationOptionsChange = (options) => {
    setVisualizationOptions(options);
  };

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const { source, destination, draggableId, type } = result;

    if (type === 'node') {
      // Update node position
      const node = orgChart.nodes.find(n => n.id === draggableId);
      if (node) {
        dispatch(updateNode({
          ...node,
          x: destination.x,
          y: destination.y
        }));
      }
    } else if (type === 'personnel') {
      // Handle personnel assignment
      const targetNode = orgChart.nodes.find(n => n.id === destination.droppableId);
      if (targetNode) {
        handlePersonnelDrop({ id: draggableId }, targetNode, dispatch, updateNode);
      }
    }
  }, [dispatch, orgChart.nodes]);

  const handleSaveChart = (savedChart) => {
    setCurrentChartId(savedChart.id);
    // You might want to show a success message here
  };

  const handleLoadChart = (chart) => {
    dispatch(setOrgChart(chart.data));
    setCurrentChartId(chart.id);
  };

  const handleSaveLayout = (savedLayout) => {
    // You might want to show a success message here
  };

  const handleLoadLayout = (layout) => {
    // Apply the loaded layout to the chart
    // This will depend on how your chart component handles layouts
  };

  const getCurrentChartData = () => ({
    nodes: orgChart.nodes,
    edges: orgChart.connections,
    factory: currentFactory,
    phase: currentPhase,
    visualizationOptions
  });

  const getCurrentLayout = () => ({
    nodes: orgChart.nodes.map(node => ({
      id: node.id,
      x: node.x,
      y: node.y
    })),
    connections: orgChart.connections
  });

  if (!currentFactory || !currentPhase) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Please select a factory and phase to view the organization chart.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Organization Chart - {currentFactory}
          </Typography>
          <Box>
            <Tooltip title="Save Chart">
              <IconButton onClick={() => setSaveDialogOpen(true)}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Load Chart">
              <IconButton onClick={() => setSaveDialogOpen(true)}>
                <FolderOpenIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Manage Layouts">
              <IconButton onClick={() => setLayoutDialogOpen(true)}>
                <ViewModuleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <SearchFilter
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Divider sx={{ my: 2 }} />
        <VisualizationOptions
          options={visualizationOptions}
          onChange={setVisualizationOptions}
        />
      </Paper>

      <Paper sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <OrgChart
            factory={currentFactory}
            phase={currentPhase}
            searchTerm={searchTerm}
            visualSettings={visualizationOptions}
          />
        </DragDropContext>
      </Paper>

      <OrgNodeCreator
        open={isNodeCreatorOpen}
        onClose={handleNodeCreatorClose}
        factory={currentFactory.id}
        phase={currentPhase.id}
      />

      <OrgChartSaveDialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSaveChart}
        onLoad={handleLoadChart}
        currentChartData={getCurrentChartData()}
      />

      <OrgChartLayoutDialog
        open={layoutDialogOpen}
        onClose={() => setLayoutDialogOpen(false)}
        onSave={handleSaveLayout}
        onLoad={handleLoadLayout}
        currentChartId={currentChartId}
        currentLayout={getCurrentLayout()}
      />
    </Box>
  );
}; 