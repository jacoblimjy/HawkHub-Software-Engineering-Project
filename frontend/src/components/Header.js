import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import Sidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  //user menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  
  //sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  

  return (
    <AppBar position="static" color="primary" sx={{ backgroundColor: 'orange' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
          <div>
          <Button edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
            <MenuIcon />
          </Button>
          <Typography variant="body3" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }} fontWeight="bold">
            HawkHub
          </Typography>
          </div>
          <div>
            <Button component={Link} to="/cart" color="inherit" startIcon={<ShoppingCartIcon />}>
              Cart
            </Button>

            {userInfo ? (
              <React.Fragment>
                <Button
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  id="user-menu"
                  onClick={handleMenuOpen}

                >
                  {userInfo.name}
                </Button>

                <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                    Profile
                  </MenuItem>

                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <Button component={Link} to="/login" color="inherit" startIcon={<AccountCircleIcon />}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
