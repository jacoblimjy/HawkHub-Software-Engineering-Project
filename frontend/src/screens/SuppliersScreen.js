import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listSuppliers } from "../actions/supplierActions";
import Supplier from "../components/Supplier";
import TextField from "@mui/material/TextField";

function SuppliersScreen() {
  const dispatch = useDispatch(); //useDispatch is a hook that gives us access to the dispatch function, we can use it to dispatch actions, dispatch means to send out
  const supplierList = useSelector((state) => state.supplierList); //supplierList is from store.js, state is the global state, state.supplierList is from reducer, reducer is from supplierReducer.js
  const { loading, error, suppliers } = supplierList; //destructure supplierList into loading, error, and products as stated in supplierReducer.js
  const [searchField, setSearchField] = React.useState("");

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
  }, []);

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
        <Message variant="danger">{error}</Message> //if there is an error, display the error message
      ) : (
        <Row>
          {filteredSuppliers.map((supplier) => (
            <Col key={supplier._id} sm={12} md={6} lg={4} xl={3}>
              <Supplier supplier={supplier} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default SuppliersScreen;
