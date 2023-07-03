import * as React from "react";
import InventoryAdder from "../components/InventoryAdder";
import InventoryTable from "../components/InventoryTable";
import MenuTable from "../components/MenuTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";

export default function StocktakingScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
    }
  }, [userInfo]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={8} lg={9} align="left" sx={{ pt: 0 }}>
          <h1>Inventory</h1>
        </Grid>
        <Grid item xs={12} md={4} lg={3} align="right" sx={{ pt: 0 }}>
          <InventoryAdder />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <InventoryTable />
        </Grid>

        <br />
        <Grid item xs={12} md={8} lg={9} align="left" sx={{ pt: 0 }}>
          <h1>Menu</h1>
        </Grid>
        <Grid item xs={12}>
          <MenuTable />
        </Grid>
      </Grid>
    </Container>
  );
}
