import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders, deliverOrder } from "../actions/orderActions";
import {
  createInventory,
  updateInventory,
  listInventories,
} from "../actions/inventoryActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import axios from "axios";

function ProfileScreen({}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inventoryList = useSelector((state) => state.inventoryList);
  const { inventoryListLoading, inventoryListError, inventories } =
    inventoryList;

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy); //added
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const isSupplier = userInfo?.isSupplier;
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        // dispatch(listMyOrders());
        // dispatch(listInventories());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    console.log("Fetched orders in ProfileScreen:", orders);
  }, [dispatch, navigate, userInfo, user, success]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
      dispatch(listInventories());
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (successDeliver) {
      dispatch(listMyOrders());
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, successDeliver]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("supplier_id", userInfo.supplier_id);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/suppliers/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          //updateUserProfile takes in an object which has properties of name, email, password, and _id
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  const receiveHandler = async (order) => {
    if (window.confirm("Confirm order received?")) {
      try {
        // console.log("order", order);
        // await dispatch(deliverOrder(order));

        const orderItems = order.orderItems;
        // console.log("orderItems", orderItems);

        for (let i = 0; i < orderItems.length; i++) {
          const orderItem = orderItems[i];
          const data = {
            name: orderItem.name,
            category: orderItem.category,
            cost: orderItem.price,
            countInStock: orderItem.qty,
            unit: orderItem.unit,
            expirationDate: orderItem.expirationDate,
          };
          const existingInventoryItem = inventories.find(
            (inventory) => inventory.name === orderItem.name
          );

          if (existingInventoryItem) {
            const updatedData = {
              ...existingInventoryItem,
              countInStock: existingInventoryItem.countInStock + orderItem.qty,
            };
            await dispatch(updateInventory(updatedData));
          } else {
            const createdInventory = await dispatch(createInventory(data));
          }
        }
        await dispatch(listInventories());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        {isSupplier && (
          <Form.Group controlId="image">
            <Form.Label>Storefront Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Upload image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {/* <Form.Label className="mx-2"> Upload Image: </Form.Label> */}
            <input
              type="file"
              id="image-file"
              label="Choose File"
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>
        )}
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#ff8000",
              "&:hover": {
                backgroundColor: "grey",
                color: "white",
              },
            }}
          >
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        {/* added */}
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Details</th>
                <th>Received</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Button
                        type="button"
                        className="btn-sm"
                        onClick={() => receiveHandler(order)}
                      >
                        Received
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
