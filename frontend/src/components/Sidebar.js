import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import TimelineIcon from "@mui/icons-material/Timeline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import "../index.css";
import hawkhubLogo from "../assets/hawkhublogo.png";
import { useSelector } from "react-redux";
import { WebsocketContext } from "./WebSocketProvider";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -75,
    top: 15,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Sidebar({ open, onClose }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isSupplier = userInfo?.isSupplier;
  const [ready, val, send] = useContext(WebsocketContext);

  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      display="flex"
      sx={{
        width: 200, // This width is equal to the width of the Sidebar component
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          backgroundColor: "f5f5f5", // Add a background color
        },
      }}
    >
      {/* <Typography variant="body" sx={{mt: '1.5rem', ml: '1rem'}} fontSize={28} fontFamily={'Helvetica'} color={'#000000'}> 
        HawkHub
      </Typography> */}
      <div className="logo-container">
        <img src={hawkhubLogo} alt="HawkHub Logo" className="hawkhub-logo" />
      </div>
      <List sx={{ mt: "0.5rem" }}>
        <ListItem
          component={Link}
          to="/"
          onClick={handleDrawerClose}
          className="list-item"
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <HomeIcon sx={{ marginBottom: "4px" }} />
          </ListItemIcon>
          <ListItemText primary="Home" className="list-item-text" />
        </ListItem>
        {!isSupplier ? (
          <>
            <ListItem
              component={Link}
              to="/stocktaking"
              onClick={handleDrawerClose}
              className="list-item"
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <InventoryIcon sx={{ marginBottom: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="StockTracker" className="list-item-text" />
            </ListItem>
            <ListItem
              component={Link}
              to="/finance"
              onClick={handleDrawerClose}
              className="list-item"
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <TimelineIcon sx={{ marginBottom: "4px" }} />
              </ListItemIcon>
              <ListItemText
                primary="FinanceTracker"
                className="list-item-text"
              />
            </ListItem>
          </>
        ) : (
          <ListItem
            component={Link}
            to="/admin/productlist"
            onClick={handleDrawerClose}
            className="list-item"
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LocalOfferIcon sx={{ marginBottom: "4px" }} />
            </ListItemIcon>
            <ListItemText primary="ProductList" className="list-item-text" />
          </ListItem>
        )}
        <ListItem
          component={Link}
          to="/suppliers/"
          onClick={handleDrawerClose}
          className="list-item"
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <StorefrontIcon sx={{ marginBottom: "4px" }} />
          </ListItemIcon>
          <ListItemText primary="Suppliers" className="list-item-text" />
        </ListItem>
        <ListItem
          component={Link}
          to="/"
          onClick={handleDrawerClose}
          className="list-item"
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <HailOutlinedIcon sx={{ marginBottom: "4px" }} />
          </ListItemIcon>
          <ListItemText primary="Guide" className="list-item-text" />
        </ListItem>
      </List>
      <List sx={{ mt: "1rem" }}>
        <ListItem
          component={Link}
          to="/notifications"
          onClick={handleDrawerClose}
          className="list-item"
        >
          {/* <ListItemIcon sx={{ minWidth: 32 }}>
            <StyledBadge
              badgeContent={val && val.notification_unread.length}
              color="warning"
            >
              <NotificationsIcon sx={{ marginBottom: "4px" }} />
            </StyledBadge>
          </ListItemIcon> */}
          <StyledBadge
            badgeContent={val && val.notification_unread.length}
            color="warning"
          >
            <ListItemText primary="Notification" className="list-item-text" />
          </StyledBadge>
        </ListItem>
        <ListItem
          component={Link}
          to="/"
          onClick={handleDrawerClose}
          className="list-item"
        >
          <ListItemText primary="Support" className="list-item-text" />
        </ListItem>
      </List>
      <Typography
        variant="body6"
        sx={{ position: "absolute", bottom: "1rem", left: "1rem" }}
        fontSize={12}
        fontFamily={"Helvetica"}
        color={"#000000"}
      >
        Empowering Hawkers.
        <br />
        Connecting Communities.
      </Typography>
    </Drawer>
  );
}

export default Sidebar;
