import * as api from "../api/index";
import * as types from "./types";

export const fetchPost = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: types.FETCH_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSinglePost(id);
    dispatch({
      type: types.FETCH_SINGLE_POST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: types.CREATE_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
