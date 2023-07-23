import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductCreateScreen({}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
    }
  }, [userInfo]);

  const unitOptions = ["kg", "g", "L", "mL", "pc"];
  const categoryOptions = [
    "Vegetables",
    "Noodles",
    "Fruits",
    "Meat",
    "Seafood",
    "Dairy",
    "Baking and Grains",
    "Condiments and Sauces",
    "Spices and Herbs",
    "Beverages",
    "Others",
  ];

  const [name, setName] = useState("Sample Name");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("2023-12-31");
  const [unit, setUnit] = useState(unitOptions[0]);

  const [uploading, setUploading] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      setName("");
      setPrice(0);
      setImage("");
      setCategory("");
      setCountInStock(0);
      setDescription("");
      setExpirationDate("");
      setUnit("");
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate("/admin/productlist");
    }
  }, [successCreate, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("expirationDate", expirationDate);
    formData.append("unit", unit);

    dispatch(createProduct(formData));
  };

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
                // console.log(image);
              }}
            />

            {/* <Form.Label className="mx-2"> Upload Image: </Form.Label>  */}
            <input
              type="file"
              id="image-file"
              label="Choose File"
              onChange={(e) => {
                setImage(e.target.files[0]);
                // console.log(image);
              }}
            />
            {uploading && <Loader />}
          </Form.Group>


          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countinstock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="unit">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              as="select"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {unitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="expirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expiration date in YYYY-MM-DD"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

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
            type="submit"
            className="my-1"
          >
            Create
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProductCreateScreen;
