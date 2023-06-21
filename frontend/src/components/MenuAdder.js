import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function MenuAdder({ change, setChange }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [snackbar, setSnackbar] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
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
        name: name,
        price: price,
      };

      await axios.post(`/api/users/createMenuItem/`, data, config);
      //   setSnackbar({
      //     children: "Menu Item successfully added",
      //     severity: "success",
      //   });
    } catch (error) {
      //   setSnackbar({
      //     children: "This Menu Item already exists",
      //     severity: "error",
      //   });
      console.log(error);
    }
    setChange(!change);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginBottom: 1 }}
      >
        Add Menu Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Menu Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the Menu Item you want to add.
            </DialogContentText>
            <div
              className="my-1"
              style={{
                display: "flex",
              }}
            >
              <TextField
                required
                error={name === ""}
                label="Ingredient Name"
                id="name"
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                error={price === ""}
                label="Price"
                id="price"
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                inputProps={{ step: "0.01" }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
