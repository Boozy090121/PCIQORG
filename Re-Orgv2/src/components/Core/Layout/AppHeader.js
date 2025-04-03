import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
<<<<<<< HEAD
  Box,
  Avatar,
  Tooltip,
  Divider
=======
  Divider,
  Snackbar,
  Alert
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Save as SaveIcon,
<<<<<<< HEAD
  FileDownload as ExportIcon,
  Help as HelpIcon
=======
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../features/Auth/authSlice';
import firebaseService from '../../../services/firebase';

<<<<<<< HEAD
const AppHeader = ({ onLogout, username = 'User' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);
=======
const AppHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth) || {};
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

<<<<<<< HEAD
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
=======
  const handleUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  };

  const handleHelpMenuClose = () => {
    setHelpAnchorEl(null);
  };

<<<<<<< HEAD
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
=======
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSave = async () => {
    try {
      await firebaseService.saveAppState();
      showSnackbar('Project saved successfully');
    } catch (error) {
      showSnackbar('Failed to save project', 'error');
      console.error('Save failed:', error);
    }
    handleClose();
  };

  const handleImport = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const state = JSON.parse(event.target.result);
              await firebaseService.importAppState(state);
              showSnackbar('Project imported successfully');
            } catch (error) {
              showSnackbar('Failed to import project', 'error');
              console.error('Import failed:', error);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    } catch (error) {
      showSnackbar('Failed to import project', 'error');
      console.error('Import failed:', error);
    }
    handleClose();
  };

  const handleExport = async () => {
    try {
      const state = await firebaseService.exportAppState();
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `re-org-project-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSnackbar('Project exported successfully');
    } catch (error) {
      showSnackbar('Failed to export project', 'error');
      console.error('Export failed:', error);
    }
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await firebaseService.logout();
      dispatch(logout());
      showSnackbar('Logged out successfully');
    } catch (error) {
      showSnackbar('Logout failed', 'error');
      console.error('Logout failed:', error);
    }
    handleUserMenuClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Re-Org Manager
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              color="inherit"
              startIcon={<CloudUploadIcon />}
              onClick={handleImport}
            >
              Import
            </Button>

            <Button
              color="inherit"
              startIcon={<CloudDownloadIcon />}
              onClick={handleExport}
            >
              Export
            </Button>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
<<<<<<< HEAD
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
=======
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSave}>Save Project</MenuItem>
            <MenuItem onClick={handleImport}>Import</MenuItem>
            <MenuItem onClick={handleExport}>Export</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Menu>

          <Menu
            id="user-menu-appbar"
            anchorEl={userMenuAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>My Account</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  );
};

export default AppHeader; 