import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listSuppliers } from "../actions/supplierActions";
import Supplier from "../components/Supplier";

function SuppliersScreen() {
    const dispatch = useDispatch() //useDispatch is a hook that gives us access to the dispatch function, we can use it to dispatch actions, dispatch means to send out
    const supplierList = useSelector(state => state.supplierList) //supplierList is from store.js, state is the global state, state.supplierList is from reducer, reducer is from supplierReducer.js
    const { loading, error, suppliers } = supplierList //destructure supplierList into loading, error, and products as stated in supplierReducer.js

    useEffect(() => {
        dispatch(listSuppliers())
    }, [])

    return (
      <div>
        <h1>Suppliers</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message> //if there is an error, display the error message
            :
            <Row>
              {suppliers.map((supplier) => (
                <Col key={supplier.id} sm={12} md={6} lg={4} xl={3}> 
                  <Supplier supplier={supplier} />
                </Col>
              ))}
            </Row>
  }
    </div>
  );
}

export default SuppliersScreen;
