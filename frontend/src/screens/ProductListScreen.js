import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { getSupplierByUserId } from "../actions/supplierActions";

function ProductListScreen({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo || !userInfo.supplier_id) {
      navigate("/login");
    } else {
      dispatch({ type: PRODUCT_CREATE_RESET });

      if (successCreate) {
        navigate(
          `/admin/${userInfo.supplier_id}/product/${createdProduct._id}/edit`
        ); //check with App.js
      } else {
        dispatch(listProducts(userInfo.supplier_id));
      }
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // const createProductHandler = () => {
  //   dispatch(createProduct());
  // };

  const createProductHandler = () => {
    navigate(`/admin/${userInfo.supplier_id}/product/create`)
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col className="text-right ml-auto">
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#ff8000",
                "&:hover": {
                  backgroundColor: "orange",
                  color: "white",
                },
              }}
              // onClick = {createProductHandler}
              onClick={createProductHandler}
              className="my-3"
            >
              <i className="fas fa-plus"></i> Create Product
            </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>

                  <td>
                    {userInfo && ( // Add this condition to check if userInfo exists
                      <>
                        <LinkContainer
                          to={`/admin/${userInfo.supplier_id}/product/${product._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;

