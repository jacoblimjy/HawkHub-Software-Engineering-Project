//a reducer is a function that takes in state and action and returns a new state, it is used to update the state
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => { //start with an initial state of an empty array of products
    switch (action.type) { //switch statement to handle different actions
        case PRODUCT_LIST_REQUEST: //if the action type is PRODUCT_LIST_REQUEST
            return { loading: true, products: [] } //return a new state with loading set to true and products set to an empty array
        case PRODUCT_LIST_SUCCESS: //if the action type is PRODUCT_LIST_SUCCESS
            return { loading: false, products: action.payload } //return a new state with loading set to false and products set to the payload of the action
        case PRODUCT_LIST_FAIL: //if the action type is PRODUCT_LIST_FAIL
            return { loading: false, error: action.payload } //return a new state with loading set to false and error set to the payload of the action
            //payload is the data that is returned from the action
        default: //if the action type is not one of the above
            return state //return the current state
    }
}

export const productDetailsReducer = (state = { loading: true, product: {} }, action) => { //start with an initial state of an empty array
    switch (action.type) { 
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state } 
        case PRODUCT_DETAILS_SUCCESS: 
            return { loading: false, product: action.payload } 
        case PRODUCT_DETAILS_FAIL: 
            return { loading: false, error: action.payload } 
        default: 
            return state 
    }
}