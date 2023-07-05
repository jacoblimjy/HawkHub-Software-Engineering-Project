import {
  MENUITEM_LIST_REQUEST,
  MENUITEM_LIST_SUCCESS,
  MENUITEM_LIST_FAIL,
  MENUITEM_CREATE_REQUEST,
  MENUITEM_CREATE_SUCCESS,
  MENUITEM_CREATE_FAIL,
  MENUITEM_UPDATE_REQUEST,
  MENUITEM_UPDATE_SUCCESS,
  MENUITEM_UPDATE_FAIL,
  MENUITEM_DELETE_REQUEST,
  MENUITEM_DELETE_SUCCESS,
  MENUITEM_DELETE_FAIL,
  MENUINGREDIENT_UPDATE_REQUEST,
  MENUINGREDIENT_UPDATE_SUCCESS,
  MENUINGREDIENT_UPDATE_FAIL,
  MENUITEM_SALE_REQUEST,
  MENUITEM_SALE_SUCCESS,
  MENUITEM_SALE_FAIL,
} from "../constants/menuConstants";

import axios from "axios";

export const listMenuItems = () => async (dispatch) => {
  try {
    dispatch({ type: MENUITEM_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/menu/getMenuItems/", config);

    dispatch({
      type: MENUITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENUITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMenuItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MENUITEM_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/menu/deleteMenuItem/`, { _id: id }, config);

    dispatch({
      type: MENUITEM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MENUITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMenuItem = (id, price) => async (dispatch) => {
  try {
    dispatch({
      type: MENUITEM_UPDATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/menu/updateMenuItem/`,
      { _id: id, price: price },
      config
    );

    dispatch({
      type: MENUITEM_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENUITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMenuItem = (name, price) => async (dispatch) => {
  try {
    dispatch({
      type: MENUITEM_CREATE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `/api/menu/createMenuItem/`,
      {
        name: name,
        price: price,
      },
      config
    );

    dispatch({
      type: MENUITEM_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MENUITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const updateMenuIngredients =
  (menuItem_id, add, remove) => async (dispatch) => {
    try {
      dispatch({
        type: MENUINGREDIENT_UPDATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/menu/updateMenuIngredient/`,
        {
          menuItem_id: menuItem_id,
          add: add,
          remove: remove,
        },
        config
      );

      dispatch({
        type: MENUINGREDIENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MENUINGREDIENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const saleMenuItem = (id, num_Sold) => async (dispatch) => {
  try {
    dispatch({
      type: MENUITEM_SALE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/menu/sellMenuItem/`,
      { _id: id, num_Sold: num_Sold },
      config
    );

    dispatch({
      type: MENUITEM_SALE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENUITEM_SALE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};
