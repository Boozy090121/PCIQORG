import { v4 as uuidv4 } from 'uuid';

class OrgChartPersistenceService {
  static STORAGE_KEY = 'org_charts';
  static LAYOUTS_STORAGE_KEY = 'org_chart_layouts';

  /**
   * Save the current org chart state
   * @param {Object} chartData - The org chart data to save
   * @param {string} name - Name of the saved chart
   * @param {string} description - Optional description
   * @returns {Object} The saved chart data with metadata
   */
  static saveChart(chartData, name, description = '') {
    const savedCharts = this.getAllSavedCharts();
    const chartId = uuidv4();
    
    const chartToSave = {
      id: chartId,
      name,
      description,
      data: chartData,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    savedCharts.push(chartToSave);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedCharts));
    
    return chartToSave;
  }

  /**
   * Load a saved org chart by ID
   * @param {string} chartId - ID of the chart to load
   * @returns {Object|null} The loaded chart data or null if not found
   */
  static loadChart(chartId) {
    const savedCharts = this.getAllSavedCharts();
    return savedCharts.find(chart => chart.id === chartId) || null;
  }

  /**
   * Get all saved org charts
   * @returns {Array} Array of saved charts
   */
  static getAllSavedCharts() {
    const savedCharts = localStorage.getItem(this.STORAGE_KEY);
    return savedCharts ? JSON.parse(savedCharts) : [];
  }

  /**
   * Delete a saved org chart
   * @param {string} chartId - ID of the chart to delete
   */
  static deleteChart(chartId) {
    const savedCharts = this.getAllSavedCharts();
    const updatedCharts = savedCharts.filter(chart => chart.id !== chartId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedCharts));
  }

  /**
   * Save a layout for a specific org chart
   * @param {string} chartId - ID of the chart
   * @param {Object} layout - The layout data to save
   * @param {string} name - Name of the layout
   * @returns {Object} The saved layout data
   */
  static saveLayout(chartId, layout, name) {
    const savedLayouts = this.getAllSavedLayouts();
    const layoutId = uuidv4();
    
    const layoutToSave = {
      id: layoutId,
      chartId,
      name,
      layout,
      timestamp: new Date().toISOString()
    };

    savedLayouts.push(layoutToSave);
    localStorage.setItem(this.LAYOUTS_STORAGE_KEY, JSON.stringify(savedLayouts));
    
    return layoutToSave;
  }

  /**
   * Get all saved layouts for a specific chart
   * @param {string} chartId - ID of the chart
   * @returns {Array} Array of saved layouts
   */
  static getChartLayouts(chartId) {
    const savedLayouts = this.getAllSavedLayouts();
    return savedLayouts.filter(layout => layout.chartId === chartId);
  }

  /**
   * Get all saved layouts
   * @returns {Array} Array of all saved layouts
   */
  static getAllSavedLayouts() {
    const savedLayouts = localStorage.getItem(this.LAYOUTS_STORAGE_KEY);
    return savedLayouts ? JSON.parse(savedLayouts) : [];
  }

  /**
   * Delete a saved layout
   * @param {string} layoutId - ID of the layout to delete
   */
  static deleteLayout(layoutId) {
    const savedLayouts = this.getAllSavedLayouts();
    const updatedLayouts = savedLayouts.filter(layout => layout.id !== layoutId);
    localStorage.setItem(this.LAYOUTS_STORAGE_KEY, JSON.stringify(updatedLayouts));
  }
}

export default OrgChartPersistenceService; 