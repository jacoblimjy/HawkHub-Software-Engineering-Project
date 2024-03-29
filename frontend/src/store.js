import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  supplierListReducer,
  supplierDetailsReducer,
  getSupplierReducer,
  supplierReviewCreateReducer,
} from "./reducers/supplierReducers";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import {
  inventoryListReducer,
  inventoryCreateReducer,
  inventoryUpdateReducer,
  inventoryDeleteReducer,
  
} from "./reducers/inventoryReducer";
import {
  menuItemListReducer,
  menuItemDeleteReducer,
  menuItemUpdateReducer,
  menuItemCreateReducer,
  menuIngredientUpdateReducer,
  menuItemSaleReducer,
} from "./reducers/menuReducers";
import {
  financialListReducer,
  financialUpdateReducer,
} from "./reducers/financialReducers";
import {
  forumPostListReducer,
  forumPostDetailsReducer,
  forumPostCreateReducer,
  forumPostUpdateReducer,
  forumPostDeleteReducer,
  forumCommentCreateReducer,
  forumCommentUpdateReducer,
  forumCommentDeleteReducer,
} from "./reducers/forumReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  supplierList: supplierListReducer,
  supplierDetails: supplierDetailsReducer,
  getSupplier: getSupplierReducer,
  supplierReviewCreate: supplierReviewCreateReducer,

  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  cart: cartReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,

  inventoryList: inventoryListReducer,
  inventoryCreate: inventoryCreateReducer,
  inventoryUpdate: inventoryUpdateReducer,
  inventoryDelete: inventoryDeleteReducer,

  menuItemList: menuItemListReducer,
  menuItemDelete: menuItemDeleteReducer,
  menuItemUpdate: menuItemUpdateReducer,
  menuItemCreate: menuItemCreateReducer,
  menuIngredientUpdate: menuIngredientUpdateReducer,
  menuItemSale: menuItemSaleReducer,

  financialList: financialListReducer,
  financialUpdate: financialUpdateReducer,

  forumPostList: forumPostListReducer,
  forumPostDetails: forumPostDetailsReducer,
  forumPostCreate: forumPostCreateReducer,
  forumPostUpdate: forumPostUpdateReducer,
  forumPostDelete: forumPostDeleteReducer,
  forumCommentCreate: forumCommentCreateReducer,
  forumCommentUpdate: forumCommentUpdateReducer,
  forumCommentDelete: forumCommentDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
//get the user info from local storage if it exists, otherwise set it to null, then pass it into the initial state

export const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}; //this is where we will add initial state, this is the state that will be used when the app is first loaded

const middleware = [thunk]; //thunk is a middleware that allows us to make asynchronous requests in our actions

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
