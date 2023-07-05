import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { createInventory } from "../actions/inventoryActions";

export default function InventoryAdder() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [countInStock, setCountInStock] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");

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
      const data = {
        name: name,
        category: category,
        cost: cost,
        countInStock: countInStock,
        unit: unit,
        expirationDate: expirationDate,
      };

      await dispatch(createInventory(data));
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
        Add Ingredient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Ingredient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the ingredient you want to add.
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
                error={category === ""}
                id="category"
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                select
              >
                <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
                <MenuItem value={"Fruits"}>Fruits</MenuItem>
                <MenuItem value={"Meat"}>Meat</MenuItem>
                <MenuItem value={"Seafood"}>Seafood</MenuItem>
                <MenuItem value={"Dairy"}>Dairy Product</MenuItem>
                <MenuItem value={"Baking and Grains"}>
                  Baking and Grains
                </MenuItem>
                <MenuItem value={"Spices and Herbs"}>Spices and Herbs</MenuItem>
                <MenuItem value={"Beverages"}>Beverages</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </TextField>
            </div>
            <div
              className="my-1"
              style={{
                display: "flex",
              }}
            >
              <TextField
                required
                error={countInStock === ""}
                label="Current Amount"
                id="countInStock"
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                onChange={(e) => setCountInStock(e.target.value)}
                type="number"
                inputProps={{ step: "0.01" }}
              />
              <TextField
                required
                error={unit === ""}
                select
                id="unit"
                label="unit"
                onChange={(e) => setUnit(e.target.value)}
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
              >
                <MenuItem value={"kg"}>kg</MenuItem>
                <MenuItem value={"g"}>g</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"mL"}>mL</MenuItem>
                <MenuItem value={"pc"}>pc</MenuItem>
              </TextField>
            </div>
            <div
              className="my-1"
              style={{
                display: "flex",
              }}
            >
              <TextField
                required
                error={cost === ""}
                label="Cost Per Unit"
                id="cost"
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                onChange={(e) => setCost(e.target.value)}
                type="number"
                inputProps={{ step: "0.01" }}
              />
              <TextField
                required
                error={expirationDate === ""}
                label="Expiration Date"
                id="expirationDate"
                size="small"
                sx={{ width: 1 / 2, m: 1 }}
                onChange={(e) => setExpirationDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                type="date"
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
