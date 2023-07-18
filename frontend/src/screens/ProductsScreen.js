import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions"; //listProducts is in curly braces because it is not the default export, it is a named export
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listSupplierDetails,
  createSupplierReview,
} from "../actions/supplierActions";
import { SUPPLIER_CREATE_REVIEW_RESET } from "../constants/supplierConstants";

function ProductsScreen({}) {
  const { supplierId } = useParams();

  const dispatch = useDispatch(); //useDispatch is a hook that gives us access to the dispatch function, we can use it to dispatch actions, dispatch means to send out
  const productList = useSelector((state) => state.productList); //get the productList from the state, state is the global state of the app, which is stored in the redux store, a state is a snapshot of the app at a given time
  const { loading, error, products } = productList; //destructure the productList object into loading, error, and products, we know that the object has these properties because we defined them in the productReducer.js file

  ///
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const supplierDetails = useSelector((state) => state.supplierDetails);
  const { supplierLoading, supplierError, supplier } = supplierDetails;
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
  ///

  useEffect(() => {
    //useEffect is a hook that allows us to run a function when the component loads, it is necessary to use this hook when we want to dispatch an action
    dispatch(listProducts(supplierId));
    dispatch(listSupplierDetails(supplierId));
    console.log(supplier);
  }, []);

  useEffect(() => {
    if (successSupplierReview) {
      setRating(0);
      setComment("");
      dispatch({ type: SUPPLIER_CREATE_REVIEW_RESET });
    }
    // dispatch(listSupplierDetails(supplierId));
  }, [dispatch, successSupplierReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSupplierReview(supplierId, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message> //if there is an error, display the error message
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {supplierLoading ? (
                <Loader />
              ) : supplierError ? (
                <Message variant="danger">{supplierError}</Message>
              ) : (
                <ListGroup variant="flush">
                  {supplier.reviews && supplier.reviews.length === 0 && (
                    <Message variant="info">No Reviews</Message>
                  )}
                  {supplier.reviews && supplier.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h4>Write a review</h4>
                    {loadingSupplierReview && <Loader />}
                    {successSupplierReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {errorSupplierReview && (
                      <Message variant="danger">{errorSupplierReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;
