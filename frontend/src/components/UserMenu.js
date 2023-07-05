import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, Menu, MenuItem } from "@mui/material";

export default function UserMenu({ anchorEl, setAnchorEl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleMenuOpen = (event) => {
    if (userInfo) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <>
      <Button
        color="inherit"
        startIcon={<AccountCircleIcon />}
        id="user-menu"
        onClick={handleMenuOpen}
      >
        {userInfo ? userInfo.name : "Login"}
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>

        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
}
