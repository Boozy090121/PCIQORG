import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip
} from '@mui/material';
import { 
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  Assignment as AssignmentIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const ResponsibilitiesView = () => {
  const nodes = useSelector(state => state.orgChart.nodes);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extract all roles with their responsibilities
  const rolesWithResponsibilities = useMemo(() => {
    return nodes
      .filter(node => node.type === 'role' && node.data.responsibilities?.length > 0)
      .map(node => ({
        id: node.id,
        label: node.data.label,
        responsibilities: node.data.responsibilities || []
      }));
  }, [nodes]);
  
  // Create a flat list of all responsibilities
  const allResponsibilities = useMemo(() => {
    const responsibilities = [];
    
    rolesWithResponsibilities.forEach(role => {
      role.responsibilities.forEach(resp => {
        responsibilities.push({
          roleId: role.id,
          roleName: role.label,
          responsibility: resp
        });
      });
    });
    
    return responsibilities;
  }, [rolesWithResponsibilities]);
  
  // Filter responsibilities based on search term
  const filteredResponsibilities = useMemo(() => {
    if (!searchTerm) return allResponsibilities;
    
    return allResponsibilities.filter(item => 
      item.responsibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allResponsibilities, searchTerm]);
  
  // Get personnel nodes
  const personnelNodes = useMemo(() => {
    return nodes.filter(node => node.type === 'personnel');
  }, [nodes]);
  
  // Find personnel assigned to roles (based on edge connections)
  const roleToPersonnelMap = useMemo(() => {
    const edges = useSelector(state => state.orgChart.edges);
    const map = {};
    
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        // If source is role and target is personnel
        if (source.type === 'role' && target.type === 'personnel') {
          if (!map[source.id]) {
            map[source.id] = [];
          }
          map[source.id].push({
            id: target.id,
            name: target.data.label,
            title: target.data.title
          });
        }
        // If source is personnel and target is role
        else if (source.type === 'personnel' && target.type === 'role') {
          if (!map[target.id]) {
            map[target.id] = [];
          }
          map[target.id].push({
            id: source.id,
            name: source.data.label,
            title: source.data.title
          });
        }
      }
    });
    
    return map;
  }, [nodes, useSelector(state => state.orgChart.edges)]);
  
  // Group responsibilities by category (we'll use first word as category)
  const responsibilitiesByCategory = useMemo(() => {
    const grouped = {};
    
    filteredResponsibilities.forEach(item => {
      // Use the first word as a simple category
      const firstWord = item.responsibility.split(' ')[0].toLowerCase();
      const category = firstWord.length > 3 ? firstWord : 'other';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      
      grouped[category].push(item);
    });
    
    return grouped;
  }, [filteredResponsibilities]);
  
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Responsibilities Overview
        </Typography>
        <Typography variant="body2" gutterBottom color="text.secondary">
          This view shows all responsibilities across roles without tying them to specific personnel.
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search responsibilities or roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ mr: 1 }} /> 
              All Responsibilities
              <Chip 
                label={`${filteredResponsibilities.length} total`} 
                size="small" 
                sx={{ ml: 2 }} 
                color="primary"
              />
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            {Object.keys(responsibilitiesByCategory).sort().map(category => (
              <Box key={category} sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    textTransform: 'capitalize', 
                    mb: 1,
                    bgcolor: 'action.hover',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  {category}
                </Typography>
                
                <Grid container spacing={2}>
                  {responsibilitiesByCategory[category].map((item, index) => (
                    <Grid item xs={12} sm={6} key={`${item.roleId}-${index}`}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {item.responsibility}
                          </Typography>
                          
                          <Tooltip title="Role" arrow>
                            <Chip 
                              icon={<WorkIcon fontSize="small" />}
                              label={item.roleName} 
                              size="small" 
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                          
                          {roleToPersonnelMap[item.roleId]?.map(person => (
                            <Tooltip key={person.id} title={person.title || 'Team Member'} arrow>
                              <Chip 
                                icon={<PersonAddIcon fontSize="small" />}
                                label={person.name} 
                                size="small" 
                                color="primary"
                                variant="outlined"
                                sx={{ mt: 1, mr: 1 }}
                              />
                            </Tooltip>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
            
            {Object.keys(responsibilitiesByCategory).length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No responsibilities found matching your search.
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon sx={{ mr: 1 }} />
              Roles Overview
            </Typography>
            
            <List>
              {rolesWithResponsibilities.map(role => (
                <ListItem key={role.id} divider>
                  <ListItemText
                    primary={role.label}
                    secondary={`${role.responsibilities.length} responsibilities`}
                  />
                  <Chip 
                    label={roleToPersonnelMap[role.id]?.length || 0} 
                    size="small" 
                    color={roleToPersonnelMap[role.id]?.length ? 'success' : 'default'}
                    sx={{ ml: 1 }}
                  />
                </ListItem>
              ))}
              
              {rolesWithResponsibilities.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No roles with responsibilities defined yet.
                </Typography>
              )}
            </List>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonAddIcon sx={{ mr: 1 }} />
              Personnel Overview
            </Typography>
            
            <List>
              {personnelNodes.map(person => (
                <ListItem key={person.id} divider>
                  <ListItemText
                    primary={person.data.label}
                    secondary={person.data.title || 'No title'}
                  />
                </ListItem>
              ))}
              
              {personnelNodes.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No personnel defined yet.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponsibilitiesView; 