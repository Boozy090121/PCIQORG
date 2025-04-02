import { useState } from 'react';

export const useChartControls = () => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartPosition, setChartPosition] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleFitScreen = () => {
    setZoom(1);
    setChartPosition({ x: 0, y: 0 });
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCanvasMouseDown = (e) => {
    if (e.target.classList.contains('org-chart-canvas')) {
      setIsDraggingCanvas(true);
      setDragStart({
        x: e.clientX - chartPosition.x,
        y: e.clientY - chartPosition.y
      });
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isDraggingCanvas) {
      setChartPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const handleCanvasMouseLeave = () => {
    setIsDraggingCanvas(false);
  };

  return {
    zoom,
    isFullscreen,
    chartPosition,
    isDraggingCanvas,
    handleZoomIn,
    handleZoomOut,
    handleFitScreen,
    handleToggleFullscreen,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasMouseLeave
  };
}; 