import {
  FORUMPOST_LIST_REQUEST,
  FORUMPOST_LIST_SUCCESS,
  FORUMPOST_LIST_FAIL,
  FORUMPOST_DETAILS_REQUEST,
  FORUMPOST_DETAILS_SUCCESS,
  FORUMPOST_DETAILS_FAIL,
  FORUMPOST_CREATE_REQUEST,
  FORUMPOST_CREATE_SUCCESS,
  FORUMPOST_CREATE_FAIL,
  FORUMPOST_UPDATE_REQUEST,
  FORUMPOST_UPDATE_SUCCESS,
  FORUMPOST_UPDATE_FAIL,
  FORUMPOST_DELETE_REQUEST,
  FORUMPOST_DELETE_SUCCESS,
  FORUMPOST_DELETE_FAIL,
  FORUMCOMMENT_CREATE_REQUEST,
  FORUMCOMMENT_CREATE_SUCCESS,
  FORUMCOMMENT_CREATE_FAIL,
  FORUMCOMMENT_UPDATE_REQUEST,
  FORUMCOMMENT_UPDATE_SUCCESS,
  FORUMCOMMENT_UPDATE_FAIL,
  FORUMCOMMENT_DELETE_REQUEST,
  FORUMCOMMENT_DELETE_SUCCESS,
  FORUMCOMMENT_DELETE_FAIL,
} from "../constants/forumConstants";
import axios from "axios";

export const listForumPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FORUMPOST_LIST_REQUEST });
    const { data } = await axios.get("/api/forum/getForumPosts/");
    dispatch({ type: FORUMPOST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMPOST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getForumPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORUMPOST_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/forum/getForumPost/${id}`);
    dispatch({ type: FORUMPOST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMPOST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createForumPost = (title, message) => async (dispatch) => {
  try {
    dispatch({ type: FORUMPOST_CREATE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/forum/createForumPost/",
      {
        title: title,
        message: message,
      },
      config
    );
    dispatch({ type: FORUMPOST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMPOST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateForumPost = (id, title, message) => async (dispatch) => {
  try {
    dispatch({ type: FORUMPOST_UPDATE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/forum/updateForumPost/${id}/`,
      {
        title: title,
        message: message,
      },
      config
    );
    dispatch({ type: FORUMPOST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMPOST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteForumPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORUMPOST_DELETE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/forum/deleteForumPost/${id}/`,
      {},
      config
    );

    dispatch({ type: FORUMPOST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMPOST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createForumComment = (postId, message) => async (dispatch) => {
  try {
    dispatch({ type: FORUMCOMMENT_CREATE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/forum/createForumComment/`,
      {
        post: postId,
        message: message,
      },
      config
    );
    dispatch({ type: FORUMCOMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMCOMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateForumComment = (id, message, post) => async (dispatch) => {
  try {
    dispatch({ type: FORUMCOMMENT_UPDATE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/forum/updateForumComment/${id}/`,
      {
        message: message,
        post: post,
      },
      config
    );
    dispatch({ type: FORUMCOMMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMCOMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteForumComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORUMCOMMENT_DELETE_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        //headers is an object that contains the headers of the request
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/forum/deleteForumComment/${id}/`,
      {},
      config
    );

    dispatch({ type: FORUMCOMMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORUMCOMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
