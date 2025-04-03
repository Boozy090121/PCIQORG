import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Save as SaveIcon,
  FileDownload as ExportIcon,
  Help as HelpIcon
} from '@mui/icons-material';

const AppHeader = ({ onLogout, username = 'User' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleHelpMenu = (event) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMainMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleHelpMenuClose = () => {
    setHelpAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  const exportChart = () => {
    handleMainMenuClose();
    // Here we would implement export functionality
    alert('Export functionality will be implemented here');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMainMenu}
        >
          <MenuIcon />
        </IconButton>
        
        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleMainMenuClose}
        >
          <MenuItem onClick={handleMainMenuClose}>
            <SaveIcon fontSize="small" sx={{ mr: 1 }} />
            Save Project
          </MenuItem>
          <MenuItem onClick={exportChart}>
            <ExportIcon fontSize="small" sx={{ mr: 1 }} />
            Export as Image
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMainMenuClose}>
            Reset Chart
          </MenuItem>
        </Menu>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Org Chart Manager
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Help">
            <IconButton color="inherit" onClick={handleHelpMenu}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            id="help-menu"
            anchorEl={helpAnchorEl}
            open={Boolean(helpAnchorEl)}
            onClose={handleHelpMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleHelpMenuClose}>How to Use</MenuItem>
            <MenuItem onClick={handleHelpMenuClose}>Keyboard Shortcuts</MenuItem>
            <MenuItem onClick={handleHelpMenuClose}>About</MenuItem>
          </Menu>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'secondary.main',
                fontSize: '0.875rem',
                mr: 1
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
            
            <Typography variant="body2" sx={{ mr: 2 }}>
              {username}
            </Typography>
            
            <Button 
              color="inherit" 
              onClick={handleLogout}
              size="small"
              variant="outlined"
              sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader; 