import {
  FINANCIAL_LIST_REQUEST,
  FINANCIAL_LIST_SUCCESS,
  FINANCIAL_LIST_FAIL,
  FINANCIAL_UPDATE_REQUEST,
  FINANCIAL_UPDATE_SUCCESS,
  FINANCIAL_UPDATE_FAIL,
} from "../constants/financialConstants";

export const financialListReducer = (state = { financials: [] }, action) => {
  switch (action.type) {
    case FINANCIAL_LIST_REQUEST:
      return { loading: true, financials: [] };
    case FINANCIAL_LIST_SUCCESS:
      return { loading: false, financials: action.payload };
    case FINANCIAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const financialUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FINANCIAL_UPDATE_REQUEST:
      return { loading: true };
    case FINANCIAL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FINANCIAL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
