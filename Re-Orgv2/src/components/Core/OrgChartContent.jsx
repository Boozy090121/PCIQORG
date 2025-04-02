import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { selectRolesByFactory } from '../../features/Organization/roleSlice';
import { selectPersonnelByRole } from '../../features/Organization/personnelSlice';
import { selectCurrentFactory } from '../../features/Organization/focusFactorySlice';
import { selectOrgChartNodes, selectOrgChartEdges, selectOrgChartLoading } from '../../features/Organization/orgChartSlice';

/**
 * OrgChartNode component for displaying a single node in the organizational chart
 * @param {Object} props - Component props
 * @param {Object} props.node - The node to display
 * @param {number} props.level - The level in the hierarchy (0-based)
 * @returns {JSX.Element} OrgChartNode component
 */
const OrgChartNode = ({ node, level }) => {
  const personnel = useSelector(state => selectPersonnelByRole(state, node.id));
  const role = useSelector(state => selectRolesByFactory(state)).find(r => r.id === node.id);

  if (!role) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          width: 200,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('application/json', JSON.stringify({
            type: 'ROLE',
            id: role.id,
            data: role
          }));
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            if (data.type === 'PERSONNEL') {
              // Handle personnel drop
              console.log('Personnel dropped on role:', data.id, role.id);
            }
          } catch (error) {
            console.error('Error handling drop:', error);
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" noWrap>
              {role.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {role.department}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {personnel.map((person) => (
            <Tooltip key={person.id} title={person.name}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify({
                    type: 'PERSONNEL',
                    id: person.id,
                    data: person
                  }));
                }}
              >
                <PersonIcon fontSize="small" />
              </Avatar>
            </Tooltip>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

OrgChartNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    parentId: PropTypes.string
  }).isRequired,
  level: PropTypes.number.isRequired
};

/**
 * OrgChartContent component for displaying the organizational chart
 * @returns {JSX.Element} OrgChartContent component
 */
export const OrgChartContent = () => {
  const currentFactory = useSelector(selectCurrentFactory);
  const nodes = useSelector(selectOrgChartNodes);
  const edges = useSelector(selectOrgChartEdges);
  const loading = useSelector(selectOrgChartLoading);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  const rootNodes = nodes.filter(node => !node.parentId);

  const renderNodeTree = (node, level = 0) => {
    const childNodes = nodes.filter(n => n.parentId === node.id);

    return (
      <Box key={node.id}>
        <OrgChartNode node={node} level={level} />
        {childNodes.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {childNodes.map(childNode => renderNodeTree(childNode, level + 1))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Organizational Chart - {currentFactory?.name || 'No Factory Selected'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        {rootNodes.map(node => renderNodeTree(node))}
      </Box>
    </Box>
  );
}; 