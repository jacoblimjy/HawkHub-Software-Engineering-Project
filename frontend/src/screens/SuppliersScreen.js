import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material"; // Import Grid from Material-UI
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listSuppliers } from "../actions/supplierActions";
import Supplier from "../components/Supplier";
import TextField from "@mui/material/TextField";

function SuppliersScreen() {
  const dispatch = useDispatch();
  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers } = supplierList;
  const [searchField, setSearchField] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) => {
    const nameMatch = supplier.user.name
      .toLowerCase()
      .includes(searchField.toLowerCase());

    const categoryMatch = supplier.products.some((product) =>
      product.category.toLowerCase().includes(searchField.toLowerCase())
    );

    const productMatch = supplier.products.some((product) =>
      product.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return nameMatch || categoryMatch || productMatch;
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    dispatch(listSuppliers());
  }, [dispatch]);

  return (
    <div>
      <h1>Suppliers</h1>
      <TextField
        size="small"
        color="warning"
        sx={{ width: "100%" }}
        placeholder="Search for Supplier, Category, or Product"
        onChange={handleChange}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {/* Use Grid instead of Row and Col */}
          {filteredSuppliers.map((supplier) => {
            if (supplier.products.length > 0) {
              return (
                <Grid key={supplier._id} item xs={12} sm={6} md={4} lg={3}>
                  <Supplier supplier={supplier} />
                </Grid>
              );
            } else {
              return null; // Exclude suppliers with no products
            }
          })}
        </Grid>
      )}
    </div>
  );
}

export default SuppliersScreen;
