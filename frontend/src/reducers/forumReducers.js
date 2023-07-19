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

export const forumPostListReducer = (state = { forumPosts: [] }, action) => {
  switch (action.type) {
    case FORUMPOST_LIST_REQUEST:
      return { loading: true, forumPosts: [] };
    case FORUMPOST_LIST_SUCCESS:
      return { loading: false, forumPosts: action.payload };
    case FORUMPOST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumPostDetailsReducer = (
  state = { forumPost: {}, coments: {} },
  action
) => {
  switch (action.type) {
    case FORUMPOST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FORUMPOST_DETAILS_SUCCESS:
      return {
        loading: false,
        forumPost: action.payload.post,
        comments: action.payload.comments,
      };
    case FORUMPOST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMPOST_CREATE_REQUEST:
      return { loading: true };
    case FORUMPOST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case FORUMPOST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumPostUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMPOST_UPDATE_REQUEST:
      return { loading: true };
    case FORUMPOST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FORUMPOST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMPOST_DELETE_REQUEST:
      return { loading: true };
    case FORUMPOST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FORUMPOST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMCOMMENT_CREATE_REQUEST:
      return { loading: true };
    case FORUMCOMMENT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case FORUMCOMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumCommentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMCOMMENT_UPDATE_REQUEST:
      return { loading: true };
    case FORUMCOMMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FORUMCOMMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumCommentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUMCOMMENT_DELETE_REQUEST:
      return { loading: true };
    case FORUMCOMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FORUMCOMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
