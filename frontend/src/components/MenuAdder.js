import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { createMenuItem } from "../actions/menuActions";

export default function MenuAdder() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      await dispatch(createMenuItem(name, price));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleClickOpen}
        sx={{ marginBottom: 1, padding: 1 }}
        fullWidth
      >
        <AddIcon sx={{ marginRight: 1 }} />
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
    </div>
  );
}
