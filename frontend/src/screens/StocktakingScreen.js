import * as React from "react";
import InventoryTable from "../components/InventoryTable";

export default function StocktakingScreen() {
  return (
    <div style={{ width: "100%" }}>
      <h1>Inventory</h1>
      <InventoryTable />
    </div>
  );
}
