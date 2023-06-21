import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import IngredientTransferList from "./IngredientTransferList";

export default function IngredientEditer({ item, change, setChange }) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(item.price);
  const [snackbar, setSnackbar] = React.useState(null);
  const [add, setAdd] = React.useState([]);
  const [remove, setRemove] = React.useState([]);

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const initAdd = [];
        const initRemove = [];
        const originalIngredients = [];
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            //headers is an object that contains the headers of the request
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/ingredients/getIngredients/`,
          config
        );

        for (let i = 0; i < item.ingredients.length; i++) {
          const ingredient = item.ingredients[i];
          originalIngredients.push({
            ingredient: ingredient.ingredient,
            quantity: ingredient.quantity,
          });
        }
        for (let i = 0; i < data.length; i++) {
          const ingredient = data[i];
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
    fetchIngredients();
  }, [open]);

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
        menuItem_id: item._id,
        add: add,
        remove: remove,
      };

      await axios.post(`/api/menu/updateMenuIngredient/`, data, config);
      await axios.put(
        "/api/menu/updateMenuItem/",
        { _id: item._id, price: price },
        config
      );
    } catch (error) {
      console.log(error);
    }
    setChange(!change);
  };

  return (
    <>
      <Button onClick={handleClickOpen} fullWidth variant="outlined">
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
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
