import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function PointOfSalesScreen() {
  const [menuItems, setMenuItems] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = async (id, name, event) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          //headers is an object that contains the headers of the request
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = {
        _id: id,
        num_Sold: 1,
      };

      await axios.post(`/api/menu/sellMenuItem/`, data, config);
      setSnackbar({
        children: "Sold " + name.toUpperCase(),
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        children: Object.values(error.response.data.data)[0],
        severity: "error",
      });
    }
  };

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            //headers is an object that contains the headers of the request
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get("/api/menu/getMenuItems", config);
        setMenuItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuItems();
    console.log(menuItems);
  }, []);

  return (
    <div>
      <h1>Point of Sales</h1>
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={6} md={4} lg={3} key={item._id}>
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
