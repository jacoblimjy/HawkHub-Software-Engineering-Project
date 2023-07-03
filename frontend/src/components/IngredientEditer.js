import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IngredientTransferList from "./IngredientTransferList";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuItem, updateMenuIngredients } from "../actions/menuActions";

export default function IngredientEditer({ item }) {
  const dispatch = useDispatch();
  const inventoryList = useSelector((state) => state.inventoryList);
  const { inventories } = inventoryList;

  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(item.price);
  const [add, setAdd] = React.useState([]);
  const [remove, setRemove] = React.useState([]);

  React.useEffect(() => {
    const processIngredients = async () => {
      try {
        const initAdd = [];
        const initRemove = [];
        const originalIngredients = [];

        for (let i = 0; i < item.ingredients.length; i++) {
          const ingredient = item.ingredients[i];
          originalIngredients.push({
            ingredient: ingredient.ingredient,
            quantity: ingredient.quantity,
          });
        }
        for (let i = 0; i < inventories.length; i++) {
          const ingredient = inventories[i];
          if (
            originalIngredients.find(
              (present) => present.ingredient === ingredient._id
            )
          ) {
            initAdd.push({
              ingredient: ingredient._id,
              name: ingredient.name,
              quantity: originalIngredients.find(
                (present) => present.ingredient === ingredient._id
              ).quantity,
              unit: ingredient.unit,
            });
          } else {
            initRemove.push({
              ingredient: ingredient._id,
              name: ingredient.name,
              quantity: 0,
              unit: ingredient.unit,
            });
          }
        }
        setAdd(initAdd);
        setRemove(initRemove);
      } catch (error) {
        console.log(error);
      }
    };
    processIngredients();
  }, [inventoryList]);

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
      await dispatch(updateMenuIngredients(item._id, add, remove));
      await dispatch(updateMenuItem(item._id, price));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="warning"
        sx={{ width: "83%" }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Update {item.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Price"
              id="price"
              size="small"
              defaultValue={item.price}
              sx={{ width: 1 / 2, marginY: 1 }}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              inputProps={{ step: "0.01" }}
            />
            <DialogContentText mb={2}>
              Add or remove ingredients from {item.name}
            </DialogContentText>
            <IngredientTransferList
              add={add}
              setAdd={setAdd}
              remove={remove}
              setRemove={setRemove}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
