import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IngredientTable from "./IngredientTable";
import MenuAdder from "./MenuAdder";
import IngredientEditer from "./IngredientEditer";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listMenuItems, deleteMenuItem } from "../actions/menuActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { create } from "@mui/material/styles/createTransitions";

export default function MenuTable() {
  const dispatch = useDispatch();
  const menuItemList = useSelector((state) => state.menuItemList);
  const { loading, error, menuItems } = menuItemList;
  const menuItemCreate = useSelector((state) => state.menuItemCreate);
  const menuItemUpdate = useSelector((state) => state.menuItemUpdate);
  const menuItemDelete = useSelector((state) => state.menuItemDelete);
  const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
  const inventoryDelete = useSelector((state) => state.inventoryDelete);

  const [expanded, setExpanded] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = async (id, event) => {
    event.preventDefault();
    try {
      dispatch(deleteMenuItem(id));
    } catch (error) {
      console.log(error);
    }
  };

  const listItem =
    menuItems &&
    menuItems.map((item) => {
      return (
        <Accordion
          className="Accordion"
          key={item._id}
          expanded={expanded === item._id}
          onChange={handleChange(item._id)}
          sx={{ "&.Mui-expanded": { backgroundColor: "#ffffff" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "40%", flexShrink: 0 }}>
              {item.name}
            </Typography>
            <Typography
              sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
            >
              Price: ${item.price}
            </Typography>
            <Typography
              sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
            >
              Cost: ${item.cost}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IngredientTable ingredients={item.ingredients} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <IngredientEditer item={item} />
              <Button
                onClick={(event) => handleDelete(item._id, event)}
                variant="outlined"
                color="error"
                sx={{ width: "15%" }}
              >
                Delete
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    });

  React.useEffect(() => {
    dispatch(listMenuItems());
    // console.log(menuItems);
    if (menuItemCreate.success) {
      setSnackbar({
        severity: "success",
        children: "Menu item created successfully",
      });
      menuItemCreate.success = null;
    } else if (menuItemUpdate.success) {
      setSnackbar({
        severity: "success",
        children: "Menu item updated successfully",
      });
      menuItemUpdate.success = null;
    } else if (menuItemDelete.success) {
      setSnackbar({
        severity: "success",
        children: "Menu item deleted successfully",
      });
      menuItemDelete.success = null;
    }
  }, [
    menuItemCreate.success,
    menuItemUpdate.success,
    menuItemDelete.success,
    inventoryUpdate.success,
    inventoryDelete.success,
  ]);

  React.useEffect(() => {
    if (menuItemCreate.error) {
      setSnackbar({
        severity: "error",
        children: menuItemCreate.error,
      });
      menuItemCreate.error = null;
    } else if (menuItemUpdate.error) {
      setSnackbar({
        severity: "error",
        children: menuItemUpdate.error,
      });
      menuItemUpdate.error = null;
    } else if (menuItemDelete.error) {
      setSnackbar({
        severity: "error",
        children: menuItemDelete.error,
      });
      menuItemDelete.error = null;
    }
  }, [menuItemCreate.error, menuItemUpdate.error, menuItemDelete.error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>{listItem}</div>
      )}
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
