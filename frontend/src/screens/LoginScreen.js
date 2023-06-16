import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({ history }) {
  //an example of location is ?redirect=/shipping, this is a query string, it is used to redirect the user to the shipping page after they login
  //an example of history is /login?redirect=/shipping, this is the path of the current page, it is used to redirect the user to the shipping page after they login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation(); //useLocation is a hook that returns the location object that represents the current URL, it is similar to history, but it has more information, such as the query string
  const navigate = useNavigate(); //useNavigate is a hook that returns a navigate function, which is used to navigate to a new location, it is similar to history.push, but it has more functionality, such as the ability to navigate to a new location without adding a new entry into the history stack, which is useful for redirects
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin); //get the userLogin from the state, state is the global state of the app, which is stored in the redux store, a state is a snapshot of the app at a given time
  const { error, loading, userInfo } = userLogin; //destructure the userLogin object into loading, error, and userInfo

  useEffect(() => {
    if (userInfo) {
      //history.push(redirect)
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]); //what useEffect does here is that it first checks if userInfo exists, if it does, then it redirects the user to the redirect page, if it doesn't, then it does nothing, insert [history, userInfo, redirect] as the second argument to useEffect so that it only runs when one of these variables changes

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); //dispatch the login action, which takes in the email and password as parameters
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />} {/*if it is loading, display the loader*/}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
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
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
