import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from "./reducers/userReducers";

// npm install react-bootstrap axios react-router-dom redux react-redux redux-thunk redux-devtools-extension @reduxjs/toolkit   

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
//get the user info from local storage if it exists, otherwise set it to null, then pass it into the initial state

export const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
} //this is where we will add initial state, this is the state that will be used when the app is first loaded

const middleware = [thunk] //thunk is a middleware that allows us to make asynchronous requests in our actions

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
});
 
export default store;
