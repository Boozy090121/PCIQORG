import React from 'react';
import { 
  Card, 
  Typography, 
  Box, 
  Divider,
  Chip
} from '@mui/material';
import { Handle, Position } from 'reactflow';
import { PersonOutlined } from '@mui/icons-material';

function FlowPersonnelNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ minWidth: 160, maxWidth: 200 }}>
        <Box sx={{ 
          p: 1, 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'secondary.light',
          color: 'secondary.contrastText'
        }}>
          <PersonOutlined sx={{ mr: 1, fontSize: 18 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {data.label || 'Person'}
          </Typography>
        </Box>
        {data.title && (
          <Box sx={{ px: 1, py: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {data.title}
            </Typography>
          </Box>
        )}
        {data.skills && data.skills.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {data.skills.slice(0, 3).map((skill, idx) => (
                  <Chip 
                    key={idx} 
                    label={skill} 
                    size="small" 
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                ))}
                {data.skills.length > 3 && (
                  <Typography variant="caption" color="text.secondary">
                    +{data.skills.length - 3} more
                  </Typography>
                )}
              </Box>
            </Box>
          </>
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default FlowPersonnelNode; 