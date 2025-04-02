export const getNodeBorderColor = (node, visualSettings) => {
  if (visualSettings.customColors && visualSettings.borderColor) {
    return visualSettings.borderColor;
  }
  
  if (node.status === 'vacant') {
    return visualSettings.highlightVacancies ? '#ff4444' : '#cccccc';
  }
  
  return '#2196f3';
};

export const getTextColor = (visualSettings) => {
  if (visualSettings.customColors && visualSettings.textColor) {
    return visualSettings.textColor;
  }
  return '#000000';
};

export const getBackgroundColor = (node, visualSettings) => {
  if (visualSettings.customColors && visualSettings.nodeColor) {
    return visualSettings.nodeColor;
  }
  
  if (node.status === 'vacant') {
    return visualSettings.highlightVacancies ? '#ffeeee' : '#f5f5f5';
  }
  
  return '#ffffff';
};

export const getNodeDimensions = (visualSettings) => {
  return {
    width: visualSettings.nodeWidth || 220,
    height: visualSettings.nodeHeight || 120,
    borderWidth: visualSettings.nodeBorderWidth || 2
  };
};

export const getNodeSpacing = (visualSettings) => {
  return {
    horizontal: visualSettings.nodeSpacing || 60,
    vertical: visualSettings.levelSpacing || 100
  };
}; 