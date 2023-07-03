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
} from "../constants/menuConstants";

export const menuItemListReducer = (state = { menuItems: [] }, action) => {
  switch (action.type) {
    case MENUITEM_LIST_REQUEST:
      return { loading: true, menuItems: [] };
    case MENUITEM_LIST_SUCCESS:
      return { loading: false, menuItems: action.payload };
    case MENUITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MENUITEM_DELETE_REQUEST:
      return { loading: true };
    case MENUITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MENUITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuItemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MENUITEM_UPDATE_REQUEST:
      return { loading: true };
    case MENUITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MENUITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuItemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MENUITEM_CREATE_REQUEST:
      return { loading: true };
    case MENUITEM_CREATE_SUCCESS:
      return { loading: false, success: true };
    case MENUITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const menuIngredientUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MENUINGREDIENT_UPDATE_REQUEST:
      return { loading: true };
    case MENUINGREDIENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MENUINGREDIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
