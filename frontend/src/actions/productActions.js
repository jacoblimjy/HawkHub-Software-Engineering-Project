import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (supplierId) => async (dispatch) => { //this is an action creator, it is a function that returns another function
    try { //try to dispatch the following actions
        dispatch({ type: PRODUCT_LIST_REQUEST }); //dispatch an action with type PRODUCT_LIST_REQUEST
        const { data } = await axios.get(`/api/suppliers/${supplierId}/products`);
        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data 
        }); //dispatch an action with type PRODUCT_LIST_SUCCESS and payload of the data, payload of the data is the data that is returned from the backend
    } catch (error) { //if there is an error
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.message && error.response.data.detail ? error.response.data.message : error.message,  
        }); //dispatch an action with type PRODUCT_LIST_FAIL and payload of the error message
    }
};  

export const listProductDetails = (supplierId, productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/suppliers/${supplierId}/products/${productId}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}