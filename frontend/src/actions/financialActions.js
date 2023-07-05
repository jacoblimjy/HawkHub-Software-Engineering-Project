import {
  FINANCIAL_LIST_REQUEST,
  FINANCIAL_LIST_SUCCESS,
  FINANCIAL_LIST_FAIL,
  FINANCIAL_UPDATE_REQUEST,
  FINANCIAL_UPDATE_SUCCESS,
  FINANCIAL_UPDATE_FAIL,
} from "../constants/financialConstants";
import axios from "axios";

export const listFiancials = () => async (dispatch) => {
  try {
    dispatch({ type: FINANCIAL_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/financial/getFinancials", config);

    for (let i = 0; i < data.length; i++) {
      data[i].date = data[i].date.substring(0, 7) + "-01";
    }

    dispatch({
      type: FINANCIAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FINANCIAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFinancial = (id, adminCost) => async (dispatch) => {
  try {
    dispatch({
      type: FINANCIAL_UPDATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/financial/updateFinancial/`,
      { _id: id, adminCost: adminCost },
      config
    );

    dispatch({
      type: FINANCIAL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FINANCIAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
