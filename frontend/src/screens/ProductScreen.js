import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";

import Button from "@mui/material/Button";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

function Productscreen({}) {
  const { supplierId, productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails); //productDetails is the name of the slice of state in the store
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(supplierId, productId));
  }, []);
  //let product = {} //create an empty object

  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      <Link
        to={`/suppliers/${supplierId}/products`}
        // className="btn btn-dark my-3"
      >
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
        <Message variant="danger">{error}</Message> //if there is an error, display the error message
      ) : (
        <Row>
          <Col md={3}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ width: "100%", height: "auto" }}
            />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          style={{
                            width: "auto",
                            backgroundImage:
                              "url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%226%22%20viewBox%3D%220%200%2012%206%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%201.3L1.3%200%206%204.7%2010.7%200%2012%201.3%206%207%22%2F%3E%3C%2Fsvg%3E')",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: "calc(100% - 8px)",
                            backgroundPositionY: "50%",
                            paddingRight: "30px",
                          }}
                        >
                          {
                            //if countInStock = 6, then [0,1,2,3,4,5]
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block px-12"
                    disabled={product.countInStock == 0}
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
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Productscreen;
