import * as React from "react";
import InventoryTable from "../components/InventoryTable";
import MenuTable from "../components/MenuTable";
import MenuAdder from "../components/MenuAdder";

export default function StocktakingScreen() {
  return (
    <div style={{ width: "100%" }}>
      <h1>Inventory</h1>
      <InventoryTable />
      <br />
      <h1>Menu</h1>
      <MenuTable />
    </div>
  );
}
