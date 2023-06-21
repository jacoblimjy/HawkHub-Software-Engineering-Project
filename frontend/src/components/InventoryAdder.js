import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function InventoryAdder({ change, setChange }) {
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
        category: category,
        cost: cost,
        countInStock: countInStock,
        unit: unit,
        expirationDate: expirationDate,
      };

      await axios.post(`/api/ingredients/createIngredient/`, data, config);
    } catch (error) {
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
                <MenuItem value={"Meat"}>Meat</MenuItem>
                <MenuItem value={"Seafood"}>Seafood</MenuItem>
                <MenuItem value={"Dairy Product"}>Dairy Product</MenuItem>
                <MenuItem value={"Spices and Herbs"}>Spices and Herbs</MenuItem>
                <MenuItem value={"Condiments"}>Condiments</MenuItem>
                <MenuItem value={"Baking and Grains"}>
                  Baking and Grains
                </MenuItem>
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
                label="Cost"
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
