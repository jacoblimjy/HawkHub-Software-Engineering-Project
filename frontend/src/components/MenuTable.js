import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IngredientTable from "./IngredientTable";
import MenuAdder from "./MenuAdder";
import axios from "axios";
import Button from "@mui/material/Button";
import IngredientEditer from "./IngredientEditer";
import { Box } from "@mui/material";

export default function MenuTable() {
  const [expanded, setExpanded] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState([]);
  const [change, setChange] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = async (id, event) => {
    event.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          //headers is an object that contains the headers of the request
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/menu/deleteMenuItem/`, { _id: id }, config);
    } catch (error) {
      console.log(error);
    }
    setChange(!change);
  };

  const listItem = menuItems.map((item) => {
    return (
      <Accordion
        key={item._id}
        expanded={expanded === item._id}
        onChange={handleChange(item._id)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {item.name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Price: ${item.price}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <IngredientTable ingredients={item.ingredients} />
          <Box
            sx={{
              display: "flex",
              marginTop: "1rem",
            }}
          >
            <IngredientEditer
              item={item}
              change={change}
              setChange={setChange}
            />
            <Button
              onClick={(event) => handleDelete(item._id, event)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  });

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
  }, [change, expanded]);
  console.log(menuItems);

  return (
    <>
      <MenuAdder change={change} setChange={setChange} />
      <div>{listItem}</div>
    </>
  );
}
