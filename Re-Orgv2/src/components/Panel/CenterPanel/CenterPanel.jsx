import React, { useState } from 'react';
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
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { selectOrgChart } from '../../../features/Organization/orgChartSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { selectCurrentPhase } from '../../../features/PhaseManagement/phaseSlice';
import { OrgChartContent } from './OrgChartContent';
import { VisualizationOptions } from '../../UI/Visualization/VisualizationOptions';
import { SearchFilter } from '../../UI/SearchFilter/SearchFilter';
import { useChartControls } from './hooks/useChartControls';
import { OrgNodeCreator } from './OrgNodeCreator';
import '../../../styles/shared/drag-drop-styles.css';

export const CenterPanel = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const currentPhase = useSelector(selectCurrentPhase);
  const orgChart = useSelector(state => 
    selectOrgChart(state, currentPhase, currentFactory)
  );

  const [isNodeCreatorOpen, setIsNodeCreatorOpen] = useState(false);
  const [isVisualizationOptionsOpen, setIsVisualizationOptionsOpen] = useState(false);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visualSettings, setVisualSettings] = useState({
    showConnections: true,
    showRoles: true,
    showPersonnel: true,
    nodeSize: 'medium',
    layout: 'hierarchical'
  });

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

  const handleVisualSettingsChange = (newSettings) => {
    setVisualSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Organization Chart</Typography>
          <Box>
            <Tooltip title="Zoom In">
              <IconButton onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fit Screen">
              <IconButton onClick={handleFitScreen}>
                <FitScreenIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fullscreen">
              <IconButton onClick={handleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Tooltip title="Add Node">
              <IconButton onClick={handleAddNodeClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visualization Options">
              <IconButton onClick={handleVisualizationOptionsOpen}>
                <TuneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search">
              <IconButton onClick={handleSearchFilterOpen}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filters">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <OrgChartContent
          nodes={orgChart.nodes}
          connections={orgChart.connections}
          zoom={zoom}
          visualSettings={visualSettings}
          searchTerm={searchTerm}
        />
      </Box>

      <OrgNodeCreator
        open={isNodeCreatorOpen}
        onClose={handleNodeCreatorClose}
      />

      <VisualizationOptions
        open={isVisualizationOptionsOpen}
        onClose={handleVisualizationOptionsClose}
        settings={visualSettings}
        onChange={handleVisualSettingsChange}
      />

      <SearchFilter
        open={isSearchFilterOpen}
        onClose={handleSearchFilterClose}
        searchTerm={searchTerm}
        onChange={handleSearchTermChange}
      />
    </Box>
  );
}; 