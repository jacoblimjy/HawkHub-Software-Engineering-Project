import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({}) {
  const { supplierId, productId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
    }
  }, [userInfo]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [unit, setUnit] = useState("");

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

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(supplierId, productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setExpirationDate(product.expirationDate);
        setUnit(product.unit);
      }
    }
  }, [dispatch, product, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
        expirationDate,
        unit,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
                onChange={(e) => setImage(e.target.value)}
              />

              {/* <Form.Label className="mx-2"> Upload Image: </Form.Label>  */}
              <input
                type="file"
                id="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
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
                placeholder="Enter expiration date"
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
