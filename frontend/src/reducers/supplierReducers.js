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

  SUPPLIER_CREATE_REVIEW_REQUEST,
  SUPPLIER_CREATE_REVIEW_SUCCESS,
  SUPPLIER_CREATE_REVIEW_FAIL,
  SUPPLIER_CREATE_REVIEW_RESET,
  
} from "../constants/supplierConstants";

export const supplierListReducer = (state = { suppliers: [] }, action) => {
  switch (action.type) {
    case SUPPLIER_LIST_REQUEST:
      return { loading: true, suppliers: [] };
    case SUPPLIER_LIST_SUCCESS:
      return { loading: false, suppliers: action.payload };
    case SUPPLIER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supplierDetailsReducer = (
  state = { supplier: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SUPPLIER_DETAILS_REQUEST:
      return { loading: true, ...state }; //... is a spread operator, ...state is the current state
    case SUPPLIER_DETAILS_SUCCESS:
      return { loading: false, supplier: action.payload }; // action.payload is the data
    case SUPPLIER_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // action.payload is the error message
    default:
      return state;
  }
};

export const getSupplierReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case GET_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        supplier: action.payload,
      };
    case GET_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const supplierReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
      case SUPPLIER_CREATE_REVIEW_REQUEST:
          return { loading: true }

      case SUPPLIER_CREATE_REVIEW_SUCCESS:
          return { loading: false, success: true, }

      case SUPPLIER_CREATE_REVIEW_FAIL:
          return { loading: false, error: action.payload }

      case SUPPLIER_CREATE_REVIEW_RESET:
          return {}

      default:
          return state
  }
}