import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Card,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  styled,
} from "@mui/material"; // Import Material-UI components
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listSupplierDetails,
  createSupplierReview,
} from "../actions/supplierActions";
import { SUPPLIER_CREATE_REVIEW_RESET } from "../constants/supplierConstants";

function ProductsScreen() {
  const { supplierId } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const supplierDetails = useSelector((state) => state.supplierDetails);
  const {
    loading: supplierLoading,
    error: supplierError,
    supplier,
  } = supplierDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const supplierCreateReview = useSelector(
    (state) => state.supplierReviewCreate
  );
  const {
    loading: loadingSupplierReview,
    error: errorSupplierReview,
    success: successSupplierReview,
  } = supplierCreateReview;

  useEffect(() => {
    dispatch(listProducts(supplierId));
    dispatch(listSupplierDetails(supplierId));
  }, [dispatch, supplierId]);

  useEffect(() => {
    if (successSupplierReview) {
      setRating(0);
      setComment("");
      dispatch({ type: SUPPLIER_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successSupplierReview]);

  useEffect(() => {
    return () => {
      dispatch({ type: SUPPLIER_CREATE_REVIEW_RESET });
    };
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      createSupplierReview(supplierId, {
        rating,
        comment,
      })
    );
    await dispatch(listSupplierDetails(supplierId));
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to={`/suppliers/`}>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "grey",
              color: "white",
            },
          }}
        >
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Grid container spacing={2}>
            {products
              .filter((product) => product.name !== "Sample Name")
              .map((product) => (
                <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Grid>
              ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Reviews</Typography>
              {supplierLoading ? (
                <Loader />
              ) : supplierError ? (
                <Message variant="danger">{supplierError}</Message>
              ) : (
                <List>
                  {supplier.reviews && supplier.reviews.length === 0 && (
                    <Message variant="info">No Reviews</Message>
                  )}
                  {supplier.reviews &&
                    supplier.reviews.map((review) => (
                      <ListItem key={review._id}>
                        <ListItemAvatar>
                          <Avatar>{review.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.name}
                          secondary={
                            <>
                              <Rating value={review.rating} />
                              <Typography component="span" variant="body2">
                                {review.createdAt.substring(0, 10)}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                {review.comment}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}

                  <Typography variant="h6">Write a review</Typography>
                  <ListItem>
                    {loadingSupplierReview && <Loader />}
                    {successSupplierReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {errorSupplierReview && (
                      <Message variant="danger">{errorSupplierReview}</Message>
                    )}
                  </ListItem>
                </List>
              )}
            </Grid>

            <ListItem>
              <Grid item xs={12} md={6}>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <FormControl fullWidth>
                      <FormLabel color="warning">Rating</FormLabel>
                      <Select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        color="warning"
                      >
                        <MenuItem value="">Select...</MenuItem>
                        <MenuItem value="1">1 - Poor</MenuItem>
                        <MenuItem value="2">2 - Fair</MenuItem>
                        <MenuItem value="3">3 - Good</MenuItem>
                        <MenuItem value="4">4 - Very Good</MenuItem>
                        <MenuItem value="5">5 - Excellent</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      color="warning"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "black",
                        "&:hover": {
                          backgroundColor: "grey",
                          color: "white",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                ) : (
                  <Message variant="info">
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </Grid>
            </ListItem>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;
