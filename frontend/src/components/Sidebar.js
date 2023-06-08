import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar({ open, onClose }) {

  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
    variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <List>
        <ListItem Button component={Link} to="/" onClick={handleDrawerClose}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem Button component={Link} to="/login" onClick={handleDrawerClose}>
          <ListItemText primary="Test" />
        </ListItem>
        <ListItem Button component={Link} to="/profile" onClick={handleDrawerClose}>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
