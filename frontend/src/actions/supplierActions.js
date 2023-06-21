import {
    SUPPLIER_LIST_REQUEST,
    SUPPLIER_LIST_SUCCESS,
    SUPPLIER_LIST_FAIL,

    SUPPLIER_DETAILS_REQUEST,
    SUPPLIER_DETAILS_SUCCESS,
    SUPPLIER_DETAILS_FAIL,

    GET_SUPPLIER_REQUEST,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIER_FAIL,
} from "../constants/supplierConstants";
import axios from "axios";

export const listSuppliers = () => async (dispatch) => {
    try {
        dispatch({ type: SUPPLIER_LIST_REQUEST }); //dispatch the action

        const { data } = await axios.get("/api/suppliers"); //make the request

        dispatch({ //dispatch the action
            type: SUPPLIER_LIST_SUCCESS, //if successful, dispatch the success action
            payload: data, //pass in the data
        });
    } catch (error) {
        dispatch({
            type: SUPPLIER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
    }
}

export const listSupplierDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUPPLIER_DETAILS_REQUEST }); 

        const { data } = await axios.get(`/api/suppliers/${id}`);

        dispatch({
            type: SUPPLIER_DETAILS_SUCCESS, 
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SUPPLIER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
        });
    }
}

export const getSupplierByUserId = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPPLIER_REQUEST });

    const { data } = await axios.get(`/api/suppliers/user/${userId}`); // Replace with your actual API endpoint

    dispatch({
      type: GET_SUPPLIER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUPPLIER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
