import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Save as SaveIcon,
  FolderOpen as OpenIcon,
  Add as NewIcon,
  Help as HelpIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';

const AppHeader = ({
  onToggleTheme,
  isDarkMode,
  onNewProject,
  onOpenProject,
  onSaveProject,
  onShowSettings,
  onShowHelp,
  onLogout,
  projectName = '',
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    handleUserMenuClose();
    action();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          size="large"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAction(onNewProject)}>
            <ListItemIcon>
              <NewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>New Project</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleAction(onOpenProject)}>
            <ListItemIcon>
              <OpenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Open Project</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleAction(onSaveProject)}>
            <ListItemIcon>
              <SaveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Save Project</ListItemText>
          </MenuItem>
        </Menu>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          {projectName || 'Organization Manager'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<HelpIcon />}
            onClick={onShowHelp}
          >
            Help
          </Button>

          <IconButton color="inherit" onClick={onToggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleUserMenuOpen}
            size="large"
          >
            <AccountCircle />
          </IconButton>
        </Box>

        <Menu
          anchorEl={userMenuAnchor}
          keepMounted
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={() => handleAction(onShowSettings)}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleAction(onLogout)}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader; 