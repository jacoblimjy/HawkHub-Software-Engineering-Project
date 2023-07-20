import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMenuItems, saleMenuItem } from "../actions/menuActions";

function PointOfSalesScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const menuItemList = useSelector((state) => state.menuItemList);
  const { loading, error, menuItems } = menuItemList;

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = async (id, name, event) => {
    try {
      await dispatch(saleMenuItem(id, 1));
      setSnackbar({
        children: "Sold " + name.toUpperCase(),
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        children: Object.values(error.response.data)[0],
        severity: "error",
      });
    }
  };

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listMenuItems());
  }, []);

  return (
    <div>
      <h1>Point of Sales</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/finance/">Go Back</Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            {menuItems &&
              menuItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Button
                    onClick={(event) => handleClick(item._id, item.name, event)}
                    variant="outlined"
                    color="warning"
                    size="large"
                    sx={{ py: 4 }}
                    fullWidth
                  >
                    {item.name}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

export default PointOfSalesScreen;
