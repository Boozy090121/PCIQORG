import React, { useState } from 'react';
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
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { selectRolesByFactory } from '../../features/Organization/roleSlice';
import { selectPersonnelByFactory } from '../../features/Organization/personnelSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

/**
 * FactoryStats component for displaying factory statistics
 * @returns {JSX.Element} FactoryStats component
 */
export const FactoryStats = () => {
  const currentFactory = useSelector(selectCurrentFactory);
  const roles = useSelector(state => selectRolesByFactory(state, currentFactory));
  const personnel = useSelector(state => selectPersonnelByFactory(state, currentFactory));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importError, setImportError] = useState('');

  if (!currentFactory) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please select a factory to view statistics
        </Typography>
      </Box>
    );
  }

  // Calculate statistics
  const totalRoles = roles.length;
  const totalPersonnel = personnel.length;
  const departments = currentFactory.departments || [];
  const rolesByDepartment = departments.reduce((acc, dept) => {
    acc[dept] = roles.filter(role => role.department === dept).length;
    return acc;
  }, {});
  const personnelByDepartment = departments.reduce((acc, dept) => {
    acc[dept] = personnel.filter(person => person.department === dept).length;
    return acc;
  }, {});

  const uniqueSkills = [...new Set(roles.flatMap(role => role.skills || []))];
  const skillsDistribution = uniqueSkills.reduce((acc, skill) => {
    acc[skill] = roles.filter(role => role.skills?.includes(skill)).length;
    return acc;
  }, {});

  // Prepare data for charts
  const departmentData = departments.map(dept => ({
    name: dept,
    roles: rolesByDepartment[dept],
    personnel: personnelByDepartment[dept]
  }));

  const skillsData = Object.entries(skillsDistribution).map(([skill, count]) => ({
    name: skill,
    value: count
  }));

  // Filter data based on search and selections
  const filteredDepartments = departments.filter(dept =>
    dept.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === 'all' || dept === selectedDepartment)
  );

  const filteredSkills = Object.entries(skillsDistribution)
    .filter(([skill]) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSkill === 'all' || skill === selectedSkill)
    )
    .sort(([, a], [, b]) => b - a);

  // Export data functionality
  const handleExportData = () => {
    const data = {
      factory: currentFactory.name,
      totalPersonnel,
      totalRoles,
      departments: departments.length,
      departmentStats: departments.map(dept => ({
        department: dept,
        roles: rolesByDepartment[dept],
        personnel: personnelByDepartment[dept]
      })),
      skillsDistribution: Object.entries(skillsDistribution).map(([skill, count]) => ({
        skill,
        count
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFactory.name}_stats.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Factory Statistics</Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExportData}
        >
          Export Data
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartment}
              label="Department"
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <MenuItem value="all">All Departments</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Skill</InputLabel>
            <Select
              value={selectedSkill}
              label="Skill"
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <MenuItem value="all">All Skills</MenuItem>
              {uniqueSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>{skill}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {totalPersonnel}
            </Typography>
            <Typography variant="subtitle1">Total Personnel</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="secondary">
              {totalRoles}
            </Typography>
            <Typography variant="subtitle1">Total Roles</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {departments.length}
            </Typography>
            <Typography variant="subtitle1">Departments</Typography>
          </Paper>
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Department Distribution
            </Typography>
            <List>
              {filteredDepartments.map((dept) => (
                <React.Fragment key={dept}>
                  <ListItem>
                    <ListItemText
                      primary={dept}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={`${rolesByDepartment[dept]} Roles`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            label={`${personnelByDepartment[dept]} Personnel`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Skills Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Skills Distribution
            </Typography>
            <List>
              {filteredSkills.map(([skill, count]) => (
                <React.Fragment key={skill}>
                  <ListItem>
                    <ListItemText
                      primary={skill}
                      secondary={`${count} roles require this skill`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 