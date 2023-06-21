import * as React from "react";
import InventoryTable from "../components/InventoryTable";
import MenuTable from "../components/MenuTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function StocktakingScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
    }
  }, [navigate, userInfo]);

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
