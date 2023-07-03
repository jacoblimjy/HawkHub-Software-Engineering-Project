import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_CREATE_REQUEST,
  INVENTORY_CREATE_SUCCESS,
  INVENTORY_CREATE_FAIL,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_SUCCESS,
  INVENTORY_UPDATE_FAIL,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DELETE_FAIL,
} from "../constants/inventoryConstants";
import axios from "axios";

export const listInventories = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_LIST_REQUEST }); //dispatch the action

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/ingredients/getIngredients/`,
      config
    ); //make the request

    dispatch({
      //dispatch the action
      type: INVENTORY_LIST_SUCCESS, //if successful, dispatch the success action
      payload: data, //pass in the data
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateInventory = (inventory) => async (dispatch) => {
  try {
    dispatch({
      type: INVENTORY_UPDATE_REQUEST,
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
      `/api/ingredients/updateIngredient/`,
      inventory,
      config
    );

    dispatch({
      type: INVENTORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    throw error;
  }
};

export const deleteInventory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INVENTORY_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/ingredients/deleteIngredient/`, { _id: id }, config);

    dispatch({
      type: INVENTORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    throw error;
  }
};

export const createInventory = (inventory) => async (dispatch) => {
  try {
    dispatch({
      type: INVENTORY_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/ingredients/createIngredient/`,
      inventory,
      config
    );

    dispatch({
      type: INVENTORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
